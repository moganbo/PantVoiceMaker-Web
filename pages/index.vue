<template>
  <section class="main-container">
    <div class="font-size-is-maximum">PVMaker</div>
    <div 
      class="font-size-is-maximum result-text-area"
      v-on:click="copyText()">
      {{resultText}}
    </div>
    <div class="font-size-is-minimal copy-text">
      ※クリックでコピーできます。
    </div>
    <!-- <div class="pant-voice-area">
      <p class="font-size-is-medium pv-label">シチュエーション</p>
      <div class="buttons has-addons pv-buttons">
        <button 
          class="button is-primary pv-button" 
          v-for="(entry, index) in pantVoiceList"
          v-bind:key="index"
          v-bind:class="{
            'is-inverted': index == selectedPvIndex, 
            'border-is-primary': index == selectedPvIndex
          }"
          v-on:click="selectPv(index)"
        >{{entry.jpName}}</button>
      </div>
    </div> -->
    <div class="pant-voice-area">
      <p class="font-size-is-medium pv-label">シチュエーション</p>
      <div v-for="(listEntry, listIndex) in pantVoiceListList"
          v-bind:key="listIndex" class="buttons has-addons pv-buttons">
        <div class="pv-button-root">
        <button 
          class="button is-primary pv-button" 
          v-for="(entry, index) in listEntry"
          v-bind:key="index"
          v-bind:class="{
            'is-inverted': listIndex == selectedPvListIndex && index == selectedPvIndex, 
            'border-is-primary': listIndex == selectedPvListIndex && index == selectedPvIndex
          }"
          v-on:click="selectPv(listIndex, index)"
        >{{entry.jpName}}</button>
        </div>
      </div>
    </div>
    <div class="word-count-area">
      <p class="font-size-is-medium wc-label">長さ</p>
      <div class="buttons has-addons wc-buttons">
        <button 
          class="button is-primary wc-button" 
          v-for="(entry, index) in wordCountList"
          v-bind:key="index"
          v-bind:class="{
            'is-inverted': index == selectedWcIndex, 
            'border-is-primary': index == selectedWcIndex
          }"
          v-on:click="selectWc(index)"
        >{{entry.jpName}}</button>
      </div>
    </div>
    <div class="brackets-area">
      <div class="brackets-checkbox-area">
      <b-checkbox v-model="isShowName">
        「」をつける
      </b-checkbox>
      </div>
      <div class="name-area" v-show="isShowName">
        <b-field label="名前">
          <b-input v-model="name"></b-input>
        </b-field>
      </div>
    </div>
    <div class="footer">
      <button 
        class="button is-primary is-medium result-button"
        v-on:click="showResult()"
        >結果</button>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      resultText: "",
      pantVoiceList: [],
      pantVoiceListList: [],
      wordCountList: [],

      selectedPvListIndex: -1,
      selectedPvIndex: -1,
      selectedWcIndex: -1,
      isShowName: false,
      name: ""
    };
  },
  mounted: function() {
    this.pantVoiceList = this.$store.state.constants.pantVoice;
    this.$store.state.constants.pantVoice.forEach(function(element, index) {
      if (
        !this.pantVoiceListList[element.category] ||
        !this.pantVoiceListList[element.category].length
      ) {
        this.pantVoiceListList[element.category] = [];
      }
      this.pantVoiceListList[element.category].push(element);
    }, this);
    console.log(this.pantVoiceListList);
    this.wordCountList = this.$store.state.constants.wordCount;
  },
  methods: {
    copyText: function() {
      if (!this.resultText) {
        return;
      }
      var copyText = this.resultText;
      document.addEventListener("copy", function handler(clipboardEvent) {
        clipboardEvent.preventDefault();
        clipboardEvent.clipboardData.setData("text/plain", copyText);
        document.removeEventListener("copy", handler); // 毎度消さないと他の文字列がコピーできなくなる
      });
      if (!document.execCommand("copy")) {
        alert("コピー失敗:\n");
        this.$ga.event("pvmaker", "onclick", "copy", "failed");
      } else {
        console.log("copy text:" + copyText);
        this.$toast.open({
          duration: 1500,
          message: `コピー成功しました。`,
          position: "is-bottom"
        });
        // this.$ga.e\vent("pvmaker", "onclick", "copy", copyText);
        this.$gtag("event", "pvmaker", {
          event_category: "onclick",
          event_label: "copy",
          value: copyText
        });
      }
    },
    // selectPv: function(index) {
    //   this.selectedPvIndex = index;
    // },
    selectPv: function(listIndex, index) {
      this.selectedPvListIndex = listIndex;
      this.selectedPvIndex = index;
    },
    selectWc: function(index) {
      this.selectedWcIndex = index;
    },
    showResult: function() {
      if (this.selectedPvListIndex == -1 || this.selectedPvIndex == -1) {
        alert("シチュエーションが選択されていません。");
        return;
      }
      if (
        this.selectedPvListIndex < 0 &&
        this.selectedPvListIndex >= this.pantVoiceListList.length
      ) {
        alert("シチュエーションが不正な値です。");
        return;
      }
      if (
        this.selectedPvIndex < 0 &&
        this.selectedPvIndex >=
          this.pantVoiceListList[selectedPvListIndex].length
      ) {
        alert("シチュエーションが不正な値です。");
        return;
      }
      // if (
      //   this.selectedPvIndex < 0 &&
      //   this.selectedPvIndex >= this.pantVoiceList.length
      // ) {
      //   alert("シチュエーションが不正な値です。");
      //   return;
      // }
      if (this.selectedWcIndex == -1) {
        alert("長さが選択されていません。");
        return;
      }
      if (
        this.selectedWcIndex < 0 &&
        this.selectedWcIndex >= this.wordCountList.length
      ) {
        alert("長さが不正な値です。");
        return;
      }
      this.resultText = this.createWord();
      var trackStr =
        "" +
        this.selectedPvIndex +
        "-" +
        this.selectedWcIndex +
        "-" +
        this.isShowName;
      if (this.isShowName) {
        trackStr += "-" + this.name;
      }
      // this.$ga.event("pvmaker", "onclick", "result", trackStr);
      this.$gtag("event", "pvmaker", {
        event_category: "onclick",
        event_label: "result",
        value: trackStr
      });
    },
    // createWord: function() {
    //   var result = "";
    //   var pvList = this.pantVoiceList[this.selectedPvIndex].list;
    //   var wordCount = this.wordCountList[this.selectedWcIndex].value;
    //   for (let i = 0; i < wordCount; i++) {
    //     var rIndex = Math.floor(Math.random() * pvList.length);
    //     result += pvList[rIndex];
    //   }
    //   if (this.isShowName) {
    //     result = this.name + "「" + result + "」";
    //   }
    //   return result;
    // }
    createWord: function() {
      var result = "";
      var pvList = this.pantVoiceListList[this.selectedPvListIndex][
        this.selectedPvIndex
      ].list;
      var wordCount = this.wordCountList[this.selectedWcIndex].value;
      for (let i = 0; i < wordCount; i++) {
        var rIndex = Math.floor(Math.random() * pvList.length);
        result += pvList[rIndex];
      }
      if (this.isShowName) {
        result = this.name + "「" + result + "」";
      }
      return result;
    }
  },
  computed: {}
};
</script>

<style>
.main-container {
  height: 100vh;
  padding: 16px;
  text-align: center;
}
.result-text-area {
  width: 600px;
  height: 160px;
  margin: 16px auto 0 auto;
  background-color: #ffdead;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
.copy-text {
  width: 600px;
  margin: 0 auto 16px auto;
  text-align: right;
}
.pant-voice-area {
  margin: 24px 0;
}
.pv-buttons {
  width: 540px;
  margin: 0 auto;
}
.pv-button-root {
  margin: 0 auto;
}
.pv-button {
  width: 108px;
}
.word-count-area {
  margin: 24px 0;
}
.wc-buttons {
  width: 240px;
  margin: 8px auto;
}
.wc-button {
  width: 80px;
}
.brackets-area {
  margin: 32px 0;
}
.name-area {
  width: 480px;
  text-align: left;
  margin: 8px auto;
  justify-content: center;
}
.footer {
  width: 100%;
  height: 72px;
  margin: 32px 0 0 0;
  padding: 16px;
  background-color: transparent;
}
.result-button {
  width: 120px;
  margin: 8px auto;
}
@media only screen and (max-width: 767px) {
  .result-text-area {
    width: 90vw;
  }
  .copy-text {
    width: 90vw;
  }
  .pv-buttons {
    width: 375px;
    margin: 8px auto;
  }
  .pv-button {
    width: 75px;
  }
  .wc-buttons {
    width: 240px;
    margin: 8px auto;
  }
  .wc-button {
    width: 80px;
  }
  .name-area {
    width: 80vw;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 375px) {
  .pv-buttons {
    width: 320px;
    margin: 8px auto;
  }
}
</style>


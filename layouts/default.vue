<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.font-size-is-minimal {
  font-size: 0.5rem;
}
.font-size-is-small {
  font-size: 0.8rem;
}
.font-size-is-default {
  font-size: 1rem;
}
.font-size-is-medium {
  font-size: 1.3rem;
}
.font-size-is-large {
  font-size: 1.5rem;
}
.font-size-is-maximum {
  font-size: 2rem;
}
@media only screen and (max-width: 767px) {
  .font-size-is-minimal {
    font-size: 0.5rem;
  }
  .font-size-is-small {
    font-size: 0.8rem;
  }
  .font-size-is-default {
    font-size: 1rem;
  }
  .font-size-is-medium {
    font-size: 1.2rem;
  }
  .font-size-is-large {
    font-size: 1.3rem;
  }
  .font-size-is-maximum {
    font-size: 1.5rem;
  }
}
</style>


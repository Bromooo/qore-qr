<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="scan = !scan">Scan</button>
    <p>{{ error }}</p>
    <qrcode-stream
      v-if="scan"
      @init="onInit"
      @decode="onDecode"
    ></qrcode-stream>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

export default {
  name: "HomeView",
  data() {
    return {
      scan: false,
      error: "",
    };
  },
  components: {
    HelloWorld,
    QrcodeStream,
    // QrcodeDropZone,
    // QrcodeCapture,
  },
  methods: {
    onDecode(decodedString) {
      // ...
      this.scan = false;
      // console.log(decodedString);
      if (this.isValidHttpUrl(decodedString)) {
        window.open(decodedString, "_self");
      } else {
        alert("Invalid QR Code");
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
    isValidHttpUrl(string) {
      let url;
      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    },
  },
};
</script>

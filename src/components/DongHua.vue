<template>
  <ul class="bg-bubbles" style="position: absolute;">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>

  </ul>
</template>

<script>
export default {
  name: "DongHua"
}
</script>

<style scoped>

.bg-bubbles {
  position: absolute;
  background-color: #222;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bg-bubbles li {
  position: absolute;
  bottom: -160px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  list-style: none;
  animation: round 15s infinite;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 90px;
  height: 90px;
  animation-delay: 2s;
  animation-duration: 7s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 8s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 2s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
  animation-duration: 15s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  animation-delay: 2s;
  animation-duration: 12s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 50%;
  width: 20px;
  height: 20px;
  animation-delay: 3s;
  animation-duration: 12s;

  background-color: rgba(255, 255, 255, 0.3);

}
.bg-bubbles li:nth-child(11) {
  left: 95%;
  width: 45px;
  height: 45px;
  animation-delay: 6s;
  animation-duration: 18s;

}
.bg-bubbles li:nth-child(12) {
  left: 60%;
  width: 30px;
  height: 30px;
  animation-delay: 4s;
  animation-duration: 12s;
}


@keyframes round {
  0% {
    opacity: 0.5;
    transform: translateY(0px);
  }
  25% {
    opacity: 0.75;
    transform: translateY(-200px);
  }
  50% {
    opacity: 1;
    transform: translateY(-500px);
  }
  100% {
    opacity: 0;
    transform: translateY(-1000px);
  }
}

</style>
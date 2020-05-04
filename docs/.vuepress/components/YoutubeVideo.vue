<template>
  <iframe 
    width="560" 
    height="315" 
    :src="youtubeUrl" 
    frameborder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</template>

<script>
export default {
  props: ['videoId'],
  computed: {
    youtubeUrl: function() {
      return `https://www.youtube.com/embed/${this.videoId}`
    }
  }
}
</script>

<style>

</style>
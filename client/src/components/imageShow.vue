<template>
  <img ref='img' :src="item.data" alt="">
</template>

<script>
import { mapState } from 'vuex';
import { getClothesImage } from '../api/clothes';
import { getClothesMatchImage } from '../api/clothesMatch';
export default {
  props: ['item','index', 'type'],
  computed: {
    ...mapState('clothes', ['clothesList', 'currentClohtesInf']),
    ...mapState('match', ['clothesMatchList']),
  },
  async mounted () {
    let a = this.item;
    
    if (!a.data) {
      let res;
      if(this.type == 'match'){
         res = await getClothesMatchImage(a.imgUrl);
      }
      else res = await getClothesImage(a.imageUrl);

      let b = URL.createObjectURL(res.data);
      this.$refs['img'].src = b;
      a.data = b;
    }
  }
}
</script>

<style>
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
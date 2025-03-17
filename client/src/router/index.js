import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '../store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  try{
    if (!store.state.clothes.isAdd) {
      await store.dispatch('clothes/getClothes', { start: true });
      // await store.dispatch('clothes/getClothesTypeByUser');
      await store.dispatch('match/getClothesMatch');

      store.state.clothes.isAdd = true;
    }
    next();
  }catch(err){
    console.log(err);
  }
});

export default router
import Vue from 'vue'
import store from '@/store/index';

const updateBefore = async () => {
  if(localStorage.getItem(process.env.VUE_APP_STORAGE_KEY))
    Vue.axios.defaults.headers.common['Authorization'] = 'Basic ' + localStorage.getItem(process.env.VUE_APP_STORAGE_KEY);
  await store.dispatch('user/update');
};

export const redirectToRoleView = (next, routerPushMode) => {
  switch(store.getters['user/getRole']){
    case 0:{
      if(routerPushMode === true)
        return 'parent';
      else
        next('/parent/');
      return;
    }
    case 1:{
      if(routerPushMode === true)
        return 'supervisor';
      else
        next('/supervisor/');
      return;
    }
    case 2:{
      if(routerPushMode === true)
        return 'admin';
      else
        next('/admin/');
      return;
    }
  }
};

export const ifNotAuthenticated = async (to, from, next) => {
  if (!store.getters['auth/isAuth']) {
    next()
    return
  } else{
    await updateBefore();
    redirectToRoleView(next);
    return;
  }
}

export const ifAuthenticated = async (to, from, next) => {
  if (store.getters['auth/isAuth']) {
    await updateBefore();
    if(store.getters['user/changedPassword'] == 0){
      next({path: '/change-password'})
      return
    } else {
      redirectToRoleView(next);
      return
    }

  }
  next('/')
}

export const ifAuthenticatedCustom = async (to, from, next) => {
  if (store.getters['auth/isAuth']) {
    await updateBefore();

    if(store.getters['user/changedPassword'] == 1){
      redirectToRoleView(next);
      return
    } else {
      next()
      return
    }
  }
  next('/')
}

export const isAdmin = async (to, from, next) => {
  if (store.getters['auth/isAuth']) {
    await updateBefore();
    if(store.getters['user/changedPassword'] == 0){
      next({path: '/change-password'})
      return
    } else if(store.getters['user/getRole'] == 2){
      next()
      return
    } else {
      redirectToRoleView(next)
      return
    }

  }
  next('/')
}

export const isSupervisor = async (to, from, next) => {
  if (store.getters['auth/isAuth']) {
    await updateBefore();
    if(store.getters['user/changedPassword'] == 0){
      next({path: '/change-password'})
      return
    } else if(store.getters['user/getRole'] == 1){
      next()
      return
    } else {
      redirectToRoleView(next)
      return
    }

  }
  next('/')
}

export const isParent = async (to, from, next) => {
  if (store.getters['auth/isAuth']) {
    await updateBefore();
    if(store.getters['user/changedPassword'] == 0){
      next({path: '/change-password'})
      return
    } else if(store.getters['user/getRole'] == 0){
      next()
      return
    } else {
      redirectToRoleView(next)
      return
    }

  }
  next('/')
}
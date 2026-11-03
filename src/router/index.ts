
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import TripsView from '@/views/TripsView.vue'
import TripDetailView from '@/views/TripDetailView.vue'
import FavouritesView from '@/views/FavouritesView.vue'
import TrashView from '@/views/TrashView.vue'
import CreateTripView from '@/views/CreateTripView.vue'
import PhotoViewerView from '@/views/PhotoViewerView.vue'

import LibraryLayout from '@/components/TripsLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/',
      component: LibraryLayout,
      children: [
        {
          path: 'trips',
          component: TripsView,
        },
        {
          path: 'favourites',
          component: FavouritesView,
        },
        {
          path: 'trash',
          component: TrashView,
        },
      ],
    },
    {
      path: '/trips/:id',
      component: TripDetailView,
    },
    {
      path: '/trips/new',
      component: CreateTripView,
    },
    {
      path: '/trips/:id/photo/:photoId',
      component: PhotoViewerView,
    },
  ],
})

export default router

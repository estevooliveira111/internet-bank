<template>

    <div class="group relative md:hidden" :class="!isNotificationsOpen ? 'rounded' : 'rounded-t'" id="notification">
        <div class="relative flex w-full justify-between" @click="notificationStore.fetchNotifications()">
            <button class="flex items-center p-2 gap-2 rounded hover:text-red-500 text-white hover:bg-white transition"
                @click="isNotificationsOpen = !isNotificationsOpen"
                :class="isNotificationsOpen ? 'bg-white !text-primary' : ''" title="Trocar conta">
                <Icon icon="material-symbols:notifications-outline" class="w-5 h-5" />
            </button>

            <!-- NOTIFICATION ALERT -->
            <div v-if="notificationStore.newNotification"
                class="h-2 w-2 bg-red-500 absolute right-2 top-2 rounded-full"></div>
            <!-- END NOTIFICATION ALERT -->
        </div>

        <!-- NOTIFICATIONS LIST -->

        <div class="w-full rounded-b bg-white shadow min-w-64 md:min-w-64 rounded mt-1"
            :class="isNotificationsOpen ? 'absolute right-0' : 'hidden'">
            <div>
                <ul>
                    <li class="p-3" v-for="(notification, index) in notificationStore.latestNotifications"
                        :key="notification.id" :class="index !== 0 ? 'border-t-2 border-gray-100' : '0'">
                        <div>
                            <p class="text-[.75rem]">
                                {{ moment(notification.timestamp).fromNow() }}
                            </p>
                            <h1 class="font-bold text-sm">{{ notification.title }}</h1>
                            <p class="text-sm">{{ notification.content }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- END NOTIFICATIONS LIST -->
    </div>


</template>


<script>

import { Icon } from '@iconify/vue'
import { useNotificationStore } from '@/stores/useNotification'

export default {

    name: 'TopNav',

    components: { Icon },

    setup() {
        const notificationStore = useNotificationStore()

        return {
            notificationStore,
        }
    },

    data() {
        return {
            isNotificationsOpen: true,
            notifications: []
        }
    }

}
</script>

<template>
    <v-navigation-drawer
        id="app-drawer"
        v-model="inputValue"
        app
        floating
        permanent
        mobile-breakpoint="991"
        width="260"
    >
        <v-list dense>
            <v-list-item
                v-for="(link, i) in links"
                :key="i"
                :to="link.to"
                :active-class="color"
                class="v-list-item"
                v-if="userPermission(link.module)"
            >
                <v-list-item-action>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-title v-text="link.text" />
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <v-list dense>
                <v-list-item
                    to="developer"
                    active-class="success"
                    class="v-list-item"
                >
                    <v-list-item-action>
                        <v-icon>mdi-file-code</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-2"
                            >Developer</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    to="faq"
                    active-class="success"
                    class="v-list-item"
                >
                    <v-list-item-action>
                        <v-icon>mdi-help-circle</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-2"
                            >Faqs</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click.stop="logout">
                    <v-list-item-action>
                        <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="subtitle-2"
                            >Logout</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";

export default {
    props: {
        opened: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        logo: "favicon.ico",
        links: [
            {
                to: "/dashboard",
                icon: "mdi-view-dashboard",
                text: "Dashboard",
                module: "dashboard"
            },
            {
                to: "/admin/purchase-histories",
                icon: "mdi-view-dashboard",
                text: "Purchase Request",
                module: "request"
            },
            {
                to: "/admin/users",
                icon: "mdi-account-group",
                text: "Users",
                module: "user"
            },
            {
                to: "/contacts",
                icon: "mdi-card-account-mail",
                text: "Contacts",
                module: "contact"
            },
            {
                to: "/blast",
                icon: "fab fa-telegram-plane",
                text: "Blast",
                module: "blast"
            },
            {
                to: "/referrals",
                icon: "mdi-handshake",
                text: "Referrals",
                module: "referral"
            },
            {
                to: "/purchase-histories",
                icon: "mdi-cart-variant",
                text: "Purchase Histories",
                module: "history"
            }
        ],
        userRole: sessionStorage.getItem("user-type"),
        profileRole: sessionStorage.getItem("profile-role")
    }),
    computed: {
        ...mapState("app", ["color"]),
        inputValue: {
            get() {
                return this.$store.state.app.drawer;
            },
            set(val) {
                this.setDrawer(val);
            }
        },
        items() {
            return this.$t("Layout.View.items");
        }
    },

    methods: {
        ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
        userPermission(module) {
            var modules = {
                dashboard: true,
                contact: true,
                blast: true,
                referral: false,
                history: true
            };
            var permissions = {
                ADMINISTRATOR: {
                    user: true,
                    request: true
                },
                SUBSCRIBER: {
                    ...modules
                }
            };
            if (this.profileRole == "PARTNER")
                permissions.SUBSCRIBER = {
                    ...modules,
                    referral: true
                };
            return permissions[this.userRole][module];
        },

        logout() {
            axios
                .get("/api/v1/logout")
                .then(response => {
                    if (response.data.errors) {
                        this.error = response.data.errors;
                        return;
                    }
                    sessionStorage.clear();
                    this.$router.push("/signin");
                })
                .catch(error => {
                    if (error.response.data.message == "Unauthenticated.") {
                        sessionStorage.clear();
                        this.$router.push("/signin");
                    }
                });
        }
    }
};
</script>

<style lang="scss">
#app-drawer {
    .v-list__tile {
        border-radius: 4px;

        &--buy {
            margin-top: auto;
            margin-bottom: 17px;
        }
    }

    .v-list .v-list-item--active {
        color: white !important;
    }
}
</style>

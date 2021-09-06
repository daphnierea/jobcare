<template>
    <v-app>
        <views-navigation class="mb-3" :color="color" :flat="flat" />
        <!-- ======= F.A.Q Section ======= -->
        <section id="faq" class="faq section-bg">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" lg="7">
                        <div class="section-title" data-aos="fade-up">
                            <h2>Frequently Asked Questions</h2>
                        </div>
                        <div class="faq-list">
                            <ul>
                                <li
                                    v-for="faq in faqs"
                                    :key="faq.delay"
                                    data-aos="fade-up"
                                    :data-aos-delay="faq.delay"
                                >
                                    <i
                                        class="far fa-question-circle icon-help"
                                    ></i
                                    ><a
                                        data-toggle="collapse"
                                        class="collapse"
                                        :href="faq.href"
                                        >{{ faq.question
                                        }}<i
                                            class="fas fa-chevron-up icon-show"
                                        ></i
                                        ><i
                                            class="fas fa-chevron-down icon-close"
                                        ></i
                                    ></a>
                                    <div
                                        :id="faq.id"
                                        class="collapse show"
                                        data-parent=".faq-list"
                                    >
                                        <p v-html="faq.answer"></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <!-- Footer -->
        <views-footer />
        <v-scale-transition>
            <v-btn
                fab
                v-show="fab"
                v-scroll="onScroll"
                dark
                fixed
                bottom
                right
                color="secondary"
                @click="toTop"
            >
                <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
        </v-scale-transition>
    </v-app>
</template>
<script type="text/javascript">
window.$crisp = [];
window.CRISP_WEBSITE_ID = "50e44ccc-d96e-4523-963b-08293bfb3a60";
(function() {
    d = document;
    s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
})();
</script>
<script>
export default {
    data() {
        return {
            faqs: [
                {
                    delay: 0,
                    href: "#faq-list-1",
                    id: "faq-list-1",
                    question: "Where do I start?",
                    answer:
                        "Start by signing up for free. Once you signed up. Verify your email and once you signed in, we'll guide you from there."
                },
                {
                    delay: 100,
                    href: "#faq-list-2",
                    id: "faq-list-2",
                    question: "How do I send sms?",
                    answer: `After signing-in. Click the button
                            <strong>Send sms</strong> you can
                            use <strong>Try</strong> for
                            testing. Input your
                            <strong>Recipient</strong> and the
                            message then click <strong>Send sms</strong>.`
                },
                {
                    delay: 200,
                    href: "#faq-list-3",
                    id: "faq-list-3",
                    question: "How do I use sms Blast",
                    answer: `After signing-in. You can use <strong>Blast</strong>
                            by clicking on the <strong>Blast</strong> button.
                            <strong>Select Group</strong> and <strong>Message</strong>,
                            then click <strong>Send sms</strong>.<br><br>
                            For SMS Blast to send SMS via CSV or Contact Groups, by clicking <strong>Blast</strong> on the menu.
                            Be sure to <strong>Request Sender Name</strong> if you want to use your own sender’s name.`
                },
                {
                    delay: 300,
                    href: "#faq-list-4",
                    id: "faq-list-4",
                    question: "How do I request custom sender name?",
                    answer: `By default, <strong>JobCare</strong> is used as the default sender.
                            You can request for your own custom sender name by <strong>Upgrading Plan</strong> on the menu,
                            then <strong>request sender name</strong>. You will receive an notification once your sender’s name is approved.
                            You can then apply your new custom sender’s name in your projects.`
                },
                {
                    delay: 400,
                    href: "#faq-list-5",
                    id: "faq-list-5",
                    question: "How do I purchase more credits?",
                    answer: `Click on <strong>Buy Credit</strong> then select the amount you want to purchase then click <strong>Buy</strong>.`
                },
                {
                    delay: 500,
                    href: "#faq-list-6",
                    id: "faq-list-6",
                    question: "How do I Upgrade plan?",
                    answer: `Click on <strong>Upgrade Plan</strong> button, then choose the plan you want to purchase,
                            then click <strong>Upgrade</strong> and click <strong>Apply now</strong>.`
                },
                {
                    delay: 600,
                    href: "#faq-list-7",
                    id: "faq-list-7",
                    question: "Where do I get API Key?",
                    answer: `Click on <strong>Developer tab</strong> on the menu to see your <strong>API Key</strong>, and method on how to integrate it with your project.`
                },
                {
                    delay: 700,
                    href: "#faq-list-8",
                    id: "faq-list-8",
                    question: "How do I add Contacts?",
                    answer: `Click on <strong>Contacts Menu</strong> button, then select Contacts tab, then click <strong>Add Contact</strong> then fill up the contact information then saved.`
                },
                {
                    delay: 800,
                    href: "#faq-list-9",
                    id: "faq-list-9",
                    question: "How do I edit Contacts?",
                    answer: `Click on <strong>Contacts Menu</strong> then select <strong>Contacts</strong> tab, then click <strong>Edit Logo Button</strong> then change the information given then saved.`
                },
                {
                    delay: 900,
                    href: "#faq-list-10",
                    id: "faq-list-10",
                    question: "How do I delete Contacts?",
                    answer: `Click on <strong>Contacts Menu</strong> then select <strong>Contacts</strong> tab, then click <strong>Delete Logo Button</strong> then click <strong>YES, DELETE IT</strong>.`
                },
                {
                    delay: 1000,
                    href: "#faq-list-11",
                    id: "faq-list-11",
                    question: "How do I add Groups?",
                    answer: `Click on <strong>Groups Menu</strong> button, then select Groups tab, then click <strong>Add Group</strong> then fill up the contact information then saved.`
                },
                {
                    delay: 1100,
                    href: "#faq-list-12",
                    id: "faq-list-12",
                    question: "How do I edit Groups?",
                    answer: `Click on <strong>Groups Menu</strong> then select <strong>Groups</strong> tab, then click <strong>Edit Logo Button</strong> then change the information given then saved.`
                },
                {
                    delay: 1200,
                    href: "#faq-list-13",
                    id: "faq-list-13",
                    question: "How do I add Contacts to Groups?",
                    answer: `Click on <strong>Contacts Menu</strong> then select <strong>Groups</strong> tab,
                            In the list of <strong>Groups</strong> select the <strong>Group</strong> where you want to add the contact.
                            After selecting, click the <strong>Add Contact in Selected Group</strong> then select the contact you want to add to the selected group`
                },
                {
                    delay: 1300,
                    href: "#faq-list-14",
                    id: "faq-list-14",
                    question: "How do I delete Groups?",
                    answer: `Click on <strong>Groups Menu</strong> then select <strong>Groups</strong> tab, then click <strong>Delete Logo Button</strong> then click <strong>YES, DELETE IT</strong>.`
                }
            ],
            fab: null,
            color: "",
            flat: null,
            componentOverlay: false
        };
    },

    methods: {
        onScroll(e) {
            if (typeof window === "undefined") return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 60;
        },

        toTop() {
            this.$vuetify.goTo(0);
        },

        formattedAmount(number) {
            let internationalNumberFormat = new Intl.NumberFormat("en-US");
            return internationalNumberFormat.format(number);
        }
    },

    created() {
        // this.fetchPlans();
        const top = window.pageYOffset || 0;
        if (top <= 40) {
            this.color = "transparent";
            this.flat = true;
        }
    },

    watch: {
        fab(value) {
            if (value) {
                this.color = "#f8f9fa";
                this.flat = false;
            } else {
                this.color = "transparent";
                this.flat = true;
            }
        }
    }
};
</script>

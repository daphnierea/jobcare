<template>
    <v-footer id="core-footer" absolute height="82">
        <v-spacer />
        <span class="font-weight-light copyright">
            &copy;
            {{ new Date().getFullYear() }}
            <a href="https://www.smson.ph/" target="_blank">SMSOn</a> beta
        </span>
        <v-spacer />
    </v-footer>
</template>

<style>
#core-footer {
    z-index: 0;
}
</style>

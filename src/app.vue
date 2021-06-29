<template>
    <div id="app">
        <p @click="add">
            {{ count }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            count:3
        }
    },
    methods: {
        add() {
            this.count++
        }
    }
}
</script>
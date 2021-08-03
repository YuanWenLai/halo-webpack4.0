<template>
    <div id="app" class="container">
        <div>学习哦，webpack</div>
        <p @click="add">
            <span>计数点击：</span>
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
<template>
    <div>
        <header class="mint-header is-fixed">
            <div class="mint-header-button is-left"></div>
            <h1 class="mint-header-title">¹Ì¶¨ÔÚ¶¥²¿</h1>
            <div class="mint-header-button is-right"></div>
        </header>
    </div>

</template>
<style>

</style>
<script>

    module.exports = {
        name: "vheader",
        props: ["msg"],
        components: {

        },
        methods:{

        },
        created()
    {
        var now = new Date()
        for(var i = 0; i < 10; i++){
            this.yearList.push(now.getFullYear() - i)
        }
        this.maxYear = this.year = now.getFullYear()
        this.minYear = this.year - 9
    },
    data()
    {
        return {


        }
    }

    }
</script>
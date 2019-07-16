<template>
    <!--component is designed to work its layout with css grid-->
    <!--it will ocupy the area at which it is being rendered-->
    <!--on mobile but only the entire length in 3/4 of the width area on desktop-->
    <div class="searchform-component">
        <form class="search-form" @submit="sendQuery">
            <input type="text" class="search-input" v-model="query"/>
            <button type="submit" class="search-button">
                <i class="fa fa-search"></i>
            </button>
        </form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: "SearchForm",

    data(){
        return{
            //query will work with an event bus to pass data from MainHeader
            //component and Tracks view to Tracks view itself to make a call api
            query: '',
        }
    },

    methods:{
        ...mapMutations(['setQuery']),

        sendQuery(e){
            e.preventDefault()
            this.setQuery(this.query)
            if(this.$route.name == 'about'){
                this.$router.history.push({name: 'tracks'})
            }
        }
    }
}
</script>

<style scoped>
@import './css/SearchForm.css';
</style>

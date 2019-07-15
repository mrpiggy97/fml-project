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
import trackBus from '@/event-buses/trackBus.js'
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
div.searchform-component{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
}

form.search-form{
    display: grid;
    grid-template-columns: 5fr 100px;
    grid-template-rows: 40px;
    grid-template-areas: "search-input search-button";
    grid-gap: 5px;
    align-content: center;
}

input[type="text"].search-input{
    grid-area: search-input;
    border: teal solid;
    border-radius: 5px;
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0%;
    font-size: large;
}

button.search-button{
    grid-area: search-button;
    color: white;
    background-color: teal;
    border: midnightblue solid;
    border-radius: 5px;
    border-top-left-radius: 0%;
    border-bottom-left-radius: 0%;
    cursor: pointer;
}

@media screen and (max-width: 769px){
    form.search-form{
        grid-template-columns: 5fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 2px;
    }
}
</style>

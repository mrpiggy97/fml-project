<template>
    <!--component is designed to work its layout with css grid-->
    <!--it will ocupy the area at which it is being rendered-->
    <!--on mobile but only the entire length in 3/4 of the width area on desktop-->
    <div class="searchform-component">
        <form class="search-form" @submit="setQuery">
            <input type="text" class="search-input" v-model="query"/>
            <button type="submit" class="search-button">
                <i class="fa fa-search"></i>
            </button>
        </form>
    </div>
</template>

<script>
import { value } from 'vue-function-api'

export default {
    name: "SearchForm",

    setup(props, context){

        const query = value('')

        const setQuery = (e) => {
            e.preventDefault()
            context.root.$store.commit('setQuery', query.value)

            if(context.root.$route.name === 'about'){
                context.root.$router.history.push({name: 'tracks'})
            }
        }

        return{
            query,
            setQuery
        }
    }
}
</script>

<style scoped>
@import './css/SearchForm.css';
</style>

<style scoped>
.overflow-show{
    overflow: scroll;
}
.form-control{
    height: 34px;
    padding: 3px 8px;
    margin-top: 3px;
}
.navbar>.container, .navbar>.container-fluid, .navbar>.container-lg, .navbar>.container-md, .navbar>.container-sm, .navbar>.container-xl, .navbar>.container-xxl {
    justify-content: stretch;
}
</style>
<template>
    <header :class="fixed">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-1">
            <div class="container">
                
                <span class="navbar-toggler border-none text-white float-start" @click="collapse" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fal fa-bars"></i>
                </span> 
                <router-link :to="{name: 'home'}" tag="a" class="navbar-brand">
                    <span v-if="site.logo">
                        <img :src="site.logo" alt="" height="30">
                    </span>
                    <span v-else>
                        <span class="text-24px" style="height: 30px;font-family: Oswald;margin-top: 0px">elmtehsil.com</span>
                    </span>
                </router-link>
                
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li class="nav-item dropdown">
                            <span class="nav-link active pointer dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ main.name }}
                            </span>
                            <ul class="dropdown-menu scrollable-menu">
                                <router-link v-for="(category,i) in main.categories" tag="li" :to="'/'+category.seo" :key="i">
                                    <a class="dropdown-item" href="#">
                                        {{ category.name }}
                                    </a>
                                </router-link>
                            </ul>
                        </li>
                        <li v-for="(item,index) in menu" :key="index" class="nav-item" :class="{'dropdown': item.categories.length > 0}">
                            <span v-if="item.categories && item.categories.length > 0">
                                <span class="nav-link active pointer dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ item.name }}
                                </span>
                                <ul class="dropdown-menu scrollable-menu">
                                    <router-link tag="li" :to="'/'+category.link" v-for="(category,i) in item.categories" :key="i">
                                        <a class="dropdown-item" href="#">
                                            {{ category.name }}
                                        </a>
                                    </router-link>
                                </ul>
                            </span>
                            <router-link tag="span" :to="'/'+item.url" v-else>
                                <a class="nav-link active" href="#">
                                    {{ item.name }}
                                </a>
                            </router-link>
                        </li>
                    </ul>
                    <div class="d-flex">
                        <input class="form-control me-2" type="search" v-model="searchText" @keyup.enter="startSearch(searchText)" placeholder="Axtar..." aria-label="Search">
                        <span class="p-2 text-primary pointer" @click="startSearch(searchText)">
                            <i class="fal fa-search"></i>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    data(){
        return{
            fixed: 'fixed-top',
            fixedT: false,
            searchText: ''
        }
    },
    methods:{
        ...mapActions([
            "search"
        ]),
        ...mapMutations([
            "startSearch"
        ]),
        collapse(){
            if(!this.fixedT){
                this.fixedT = true;
                this.fixed = 'sticky-top';
            }
            else{
                this.fixedT = false;
                this.fixed = 'fixed-top';
            }
        }
    },
    computed:{
        ...mapState({
            "menu":             state => state.Start.menu,
            "main":             state => state.Start.mainMenu,
            "site":             state => state.Start.siteData.settings
        })
    },
    created(){
        this.$store.dispatch("getDatas");
    }
}
</script>
<template>
    <div>
        <Header/>
        <Loader v-if="loader"/>
        <div class="container mt-6" v-else>
            <div class="row">
                <section class="col-lg-9 col-sm-12">
                    <div class="articles">
                        <div class="d-flex alert alert-primary" role="alert">

                            <div class="p-1">
                                <span>
                                    Axtarışınız üzrə tapılan xəbərlər
                                </span>
                            </div>
                            <div class="ms-auto p-1">
                                <span>
                                    Cəmi: {{ count }}
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-12">
                            <div class="d-flex">
                                <input class="form-control me-2" type="search" v-model="searchText" @keyup.enter="startSearch(searchText)" placeholder="Axtar..." aria-label="Search">
                                <span class="p-2 text-primary pointer" @click="startSearch(searchText)">
                                    <i class="fal fa-search"></i>
                                </span>
                            </div>
                        </div>
                        <News :news="searchArray"/>
                        <Pagination :link="'/search/' + $route.params.search" :newsCount="count" :currentPag="pag"/>
                    </div>
                </section>
                <section class="col-lg-3 col-sm-12">
                   <RightSide/>
                </section>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
import Header     from '../pageParts/Header';
import RightSide  from '../pageParts/RightSide';
import Footer     from '../pageParts/Footer';
import News       from '../pageParts/News';
import Loader     from '../pageParts/Loader';
import Pagination       from '../pageParts/Pagination';


import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';


export default {
    data(){
        return {
            post: 0,
            index: -1,
            searchText: '',
        }
    },
    methods:{
        ...mapActions([
           "search"
        ]),
        ...mapMutations([
            "startSearch"
        ]),
        routeSet(){
            window.scrollTo(0, 0);
            const search    = this.$route.params.search;
            let page        = this.$route.params.page;
            if(search){
                if(!page){
                    page = 1;
                }
                this.search({search,page});
            }
            else{
                this.$router.push({name: "not-found"});
            }
        }
    },
    computed:{
        ...mapState({
            "imageRoot":        state => state.Start.imageRoot,
            "news":             state => state.News.news,
            "loader":           state => state.Start.loader,
            "count":            state => state.Start.searchCount,
            "pag":              state => state.News.pagination,
            "searchArray":      state => state.Start.searchArray
        }),
        ...mapGetters([
        ])
    },
    components:{
        Header,
        Footer,
        RightSide,
        News,
        Loader,
        Pagination
    },
    beforeRouteUpdate(to,from,next){        
        next();
        console.log(to);
        this.routeSet();
    },
    created(){
        this.routeSet();
    }
}
</script>


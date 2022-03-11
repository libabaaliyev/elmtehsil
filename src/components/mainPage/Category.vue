<template>
    <div>
        <Header/>
        
        <div class="container mt-6">
            <div class="row">
                <section class="col-lg-9 col-sm-12">
                    <Loader v-if="loader"/>
                    <div class="articles"  v-else>
                        <div class="d-flex align-items-center bg-primary p-2 text-light rounded">
                            <div class="flex-grow-1 ms-3">
                                <span class="text-18px">
                                    <b>
                                        {{ categories[index]['name'] }}
                                    </b>
                                </span>
                                <br>
                                <p class="m-0 mt-3 p-0"><b>
                                    <span class="me-2"><i class="fal fa-feather"></i> {{ count }}</span> 
                                    <span class="ms-2"><i class="fal fa-eye"></i> {{ hit }}</span>
                                    </b>
                                </p>
                            </div>
                        </div>
                        <News :news="news"/>
                        <Pagination :link="'/' + $route.params.bolme" :newsCount="count" :currentPag="pag"/>
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
            index: -1
        }
    },
    methods:{
        ...mapMutations([
            "selectTab",
            "likeArticle"
        ]),
        ...mapActions([
           "getCategory",
           "getPage"
        ]),
        routeSet(){
            window.scrollTo(0, 0);
            const category  = this.$route.params.bolme;
            let page        = this.$route.params.page;
            if(category){
                this.index      = this.controlCategory(category);
                if(this.index >= 0){
                    window.document.title = this.categories[this.index]['name']
                    if(!page){
                        page = 1;
                        this.getCategory({category,action: 'category'});
                    }
                    else{
                        this.getPage({page,action: 'news',tag: 'get-category',category});
                    }
                }
                else{
                    this.$router.push({name: "redirect"});
                }
            }
            else{
                this.$router.push({name: "home"});
            }
        }
    },
    computed:{
        ...mapState({
            "imageRoot":        state => state.Start.imageRoot,
            "article":          state => state.News.article,
            "news":             state => state.News.news,
            "categoryNews":     state => state.News.categoryNews,
            "loader":           state => state.News.loader,
            "count":            state => state.News.articleCount,
            "hit":              state => state.News.hit,
            "pag":              state => state.News.pagination,
            "categories":       state => state.News.categories
        }),
        ...mapGetters([
            "seo",
            "editTime",
            "controlCategory"
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
        this.routeSet();
    },
    beforeRouteLeave(to,from,next){
       next();
       this.routeSet();
    },
    created(){
        this.routeSet();
    }
}
</script>


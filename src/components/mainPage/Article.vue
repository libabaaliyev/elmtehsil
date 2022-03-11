<template>
    <div>
        <Header/>
        <Loader v-if="loader"/>
        <div class="container mt-6" v-else>
            <div class="row">
                <section class="col-lg-9 col-sm-12">
                    <div class="article">
                        <div class="w-100 blog-post-meta mb-1">
                            <router-link class="text-decoration-none text-primary" tag="a" :to="'/' + article.category" >
                                {{ article.category_name }}
                            </router-link>
                        </div>
                        <div class="col-12 border-bottom" id="article-title">
                            <h2 class="text-24px pt-1 pb-1">
                                {{ article.name }}
                            </h2>
                        </div>

                        <div class="w-100 blog-post-meta pt-2 pb-2 mb-1">
                            <router-link class="pe-3 text-decoration-none text-primary" tag="a" :to="'/authors/' + article.username" >
                                {{ article.author }}
                            </router-link>
                            <span class="pe-3">
                                {{ editTime(article.time) }}
                            </span>
                            <span class="pe-3">
                                <i class="fal fa-eye"></i> {{ article.hit }}
                            </span>
                        </div>

                        <div class="col-12 h-max-350px overflow-hidden mb-3">
                            <img :src="imageRoot + article.image" class="img-height" :alt="article.name">
                        </div>
                        <div class="col-12">
                            <!-- blog post -->
                            <div class="blog-post" v-html="article.text">
                            </div>
                            <PostShare :article="article" />
                            <!-- /.blog-post -->
                        </div>

                    </div>
                    <div class="more-articles">
                        <News :news="categoryNews"/>
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
import Header       from '../pageParts/Header';
import RightSide    from '../pageParts/RightSide';
import Footer       from '../pageParts/Footer';
import News         from '../pageParts/News';
import Loader       from '../pageParts/Loader';
import PostShare    from '../pageParts/PostShare';

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
    data(){
        return {
            post: 0
        }
    },
    methods:{
        ...mapMutations([
            "selectTab",
            "likeArticle"
        ]),
        ...mapActions([
           "getArticle",
           "getArticleID" 
        ]),
        selectPagination(pagination){
            if(pagination != this.currentPag){
                this.getPage(pagination);
            }
        },
        routeSet(){
            window.scrollTo(0, 0);
            const seo       = this.$route.params.seo;
            const category  = this.$route.params.bolme;
            const id        = this.$route.params.id;
            
            if(id){
                this.getArticleID({id,seo});
            }
            else{
                this.getArticle({seo,category});
            }
        }
    },
    computed:{
        ...mapState({
            "imageRoot":        state => state.Start.imageRoot,
            "article":          state => state.News.article,
            "news":             state => state.News.news,
            "categoryNews":     state => state.News.categoryNews,
            "loader":           state => state.News.loader
        }),
        ...mapGetters([
            "seo",
            "editTime",
            "getLike"
        ])
    },
    watch:{
        
    },
    components:{
        Header,
        Footer,
        RightSide,
        News,
        Loader,
        PostShare
    },
    created(){
        this.routeSet();
    },
    beforeRouteUpdate(to,from,next){
        console.log('update');
        next();
        this.routeSet();
    },
    beforeRouteLeave(to,from,next){
        window.scrollTo(0, 0);
        next();
        location.reload();
    },
    beforeRouteEnter(to,from,next){
        next();
        //this.routeSet();
    }
}
</script>


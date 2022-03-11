<template>
    <div>
        <Header/>
        <Loader v-if="loader"/>
        <div class="container mt-6" v-else>
            <div class="row">
                <section class="col-lg-9 col-sm-12 p-0">
                    <object
                        :data="book.url"
                        type="application/pdf"
                        width="100%"
                        height="100%"
                    >
                        <div class="alert alert-warning" role="alert">
                            <p>
                                Əgər cihazınız pdf oxuyucunu dəstəkləmirsə <a :href="book.url">burdan yükləyə və ya oxuya bilərsiniz</a>.
                            </p>
                        </div>
                        <div class="alert alert-danger" role="alert">
                            <p>
                                Verilən link işləmirsə, <a :href="'/report/kitab/'+book.book_seo">Bizə bildirin</a>.
                            </p>
                        </div>
                        
                    </object>

                    

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
import Loader       from '../pageParts/Loader';

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
           "getBook" 
        ]),
        routeSet(){
            window.scrollTo(0, 0);
            const seo = this.$route.params.seo;
            if(seo){
                this.getBook(seo);
            }
            
        }
    },
    computed:{
        ...mapState({
            "imageRoot":        state => state.Start.imageRoot,
            "article":          state => state.News.article,
            "news":             state => state.News.news,
            "categoryNews":     state => state.News.categoryNews,
            "loader":           state => state.Start.loader,
            "book":             state => state.Library.book
        }),
        ...mapGetters([
            "getLike"
        ]),
        favori(){
            let seo     = this.article.seo;
            let control = this.getLike(seo,'text');
            return control;
        }
    },
    components:{
        Header,
        Footer,
        RightSide,
        Loader
    },
    created(){
        this.routeSet();
    }
}
</script>


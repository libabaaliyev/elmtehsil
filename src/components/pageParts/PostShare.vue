<template>
    <div>
        <div class="d-block w-100 float-start post-share border-top p-2">
            <div class="float-start">
                <label class="bg-danger text-decoration-none pointer" @click="like">
                    <i class="fas fa-heart"></i><span>{{ favori }}</span>
                    <!-- <span class="badge text-light" v-if="article.heart > 0">{{ article.heart }}</span> -->
                </label>
                <a :href="'https://facebook.com/sharer/sharer.php?u='+ currentUrl" class="social-facebook text-decoration-none"><i class="fab fa-facebook-f"></i><span>Facebook-da paylaş</span></a>
                <a :href="'https://twitter.com/share?url=' + currentUrl" class="social-twitter text-decoration-none"><i class="fab fa-twitter"></i><span>Twitter-də paylaş</span></a>
                <a :href="'https://pinterest.com/pin/create/button/?url=' + currentUrl + '&media='+ imageRoot + article.image
                + '&description=' + article.name" 
                class="social-pinterest text-decoration-none"><i class="fab fa-pinterest"></i><span>Pinlə</span></a>
                <a :href="'mailto:?subject=Xəbərimiz var...&amp;body=' + article.name + ' - ' + currentUrl" 
                class="text-decoration-none"><i class="fal fa-envelope"></i><span>Email göndər</span></a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapMutations, mapState } from 'vuex';
export default {
    props:['article'],
    data(){
        return{
            likeText: 'Bəyən',
            likes: 0
        }
    },
    methods:{
        ...mapMutations([
            "likeArticle"
        ]),
        like(){
            this.likes++;
            this.likeArticle(this.article)
        }

    },
    computed:{
        ...mapState({
            "imageRoot":    state => state.Start.imageRoot
        }),
        ...mapGetters([
            "getLike"
        ]),
        favori(){
            if(localStorage.getItem("likeArticles")){
                let seo     = this.article.seo;
                let control = this.getLike(seo,'text');
                return control;
            }
            else{
                return this.likeText;
            }
        },
        currentUrl(){
            return window.location.href;
        }
    },
    watch:{
        likes(e){
            if(e){
                let seo         = this.article.seo;
                let control     = this.getLike(seo,'text');
                this.likeText   = control;
            }
        }
    }
}
</script>
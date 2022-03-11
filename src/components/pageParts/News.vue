<template>
    <div class="row pt-2">
        <Loader v-if="loader"/>
        <div v-else>
            <div v-if="news.length == 0">
                <div class="w-100 h-300px position-relative">
                    <span class="position-absolute top-50 start-50 translate-middle text-center w-100" v-if="activeTab == 'likes'">
                        <i class="fal fa-search p-3"></i>
                        Bəyəndiyiniz məqalə yoxdur.</span>
                    <span class="position-absolute top-50 start-50 translate-middle text-center w-100" v-else>
                        <i class="fal fa-search p-3"></i>
                        Heç bir məqalə tapılmadı
                    </span>
                </div>
            </div>
            <div v-else>
                <div v-for="(post,i) in news" :key="i" class="col-12 card border-none mb-3">
                    <div class="row g-0">
                        <router-link :to="'/'+post.category + '/' + post.seo" tag="div" class="col-md-4 h-200px">
                            <img :src="imageRoot + post.image" class="img-fluid img-height rounded-start pointer" :alt="post.name">
                        </router-link>
                        <div class="col-md-8">
                            <div class="card-body">
                                <router-link :to="'/'+post.category + '/' + post.seo" tag="h5" class="card-title pointer">{{ post.name }}</router-link>
                                <router-link :to="'/'+post.category" tag="h6" class="card-title text-primary pointer"><small><b>{{ post.category_name }}</b></small></router-link>
                                <router-link :to="'/'+post.category + '/' + post.seo" tag="p" class="card-text pointer">
                                    <small class="text-14px" v-text="((post.text).replace(/<[^>]*>?/gm, '')).substr(0,120)">
                                    ...
                                    </small>
                                </router-link>
                                <p class="card-text">
                                    <small class="text-muted pointer">
                                        <i class="fal fa-user-alt pe-1"></i>
                                        <b>
                                            <router-link :to="'/authors/'+post.username" tag="span" class="pointer">
                                                {{ post.author }}
                                            </router-link>
                                        </b>
                                    </small>
                                    <small class="text-muted ps-2">
                                        <i class="fal fa-clock"></i>
                                        {{ editTime(post.time) }} 
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
import Loader from '../pageParts/Loader';
export default {
    data(){
        return {
        }
    },
    props:["news"],
    computed:{
        ...mapState({
            "activeTab":    state => state.Start.activeTab,
            "imageRoot":    state => state.Start.imageRoot,
            "loader":       state => state.News.loader
        }),
        ...mapGetters([
            "seo",
            "editTime"
        ])
    },
    watch:{
        news(obj){
            if(obj){
                this.$store.state.News.loader = false;
            }
        }
    },
    components:{
        Loader
    }
}
</script>
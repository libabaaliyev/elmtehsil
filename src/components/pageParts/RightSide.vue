<template>
    <div>
        <!-- Section ads -->
        <section id="ads" v-if="sideAds">
            <div class="col-12 pointer">
                <h6>Sponsor reklamı</h6>
                <hr>
                <span>
                    <span v-if="sideAds.category =='image'">
                        <a :href="sideAds.url" target="_blank">
                            <img :src="imageRoot + sideAds.image" :alt="sideAds.name" class="img-fluid">
                        </a>
                    </span>
                    <span v-else>
                        {{ sideAds.code }}
                    </span>
                </span>
            </div>
        </section>
        <!-- Section ads -->

        <!-- Section subscription -->
        <section id="subscription">
            <div class="col-12 mt-6">
                <div class="card position-relative">
                    
                    <div class="card-body">
                        <div class="position-absolute top-0 start-50 translate-middle w-75">
                            <h5 class="card-title text-center bg-white w-auto">Android tətbiq</h5>
                        </div>    
                        <p class="card-text text-center p-2">Android proqramı yükləyərək elmi-texnoloji yeniliklərdən daha tez məlumat ala bilərsiniz.</p>
                        <a href="https://play.google.com/store/apps/details?id=com.alibabastudio.elmtehsilcom" class="btn btn-danger mt-2 w-100">Yüklə</a>
                    </div>
                </div>
            </div>
        </section>
        <!-- Section subscription -->
        <!-- popular posts -->
        <section class="mt-5" id="popular-posts">
            <router-link v-for="(post,i) in popular" :key="i" tag="div" :to="'/'+post.category + '/' + post.seo" class="card border-none pointer mt-4">
                <img :src="imageRoot + post.image" class="card-img-top h-180px img-height" :alt="post.name">
                <div class="card-body">
                    <span class="card-text text-12px">
                        {{ editTime(post.time) }}                        
                    </span>
                    <h6 class="card-title">
                        <small>
                            <b>
                                {{ post.name }}
                            </b>
                        </small>
                    </h6>
                </div>
            </router-link>
        </section>
        <!-- popular posts -->

    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
    computed:{
        ...mapState({
            "popular":          state => state.News.popular,
            "imageRoot":        state => state.Start.imageRoot,
            "ads":              state => state.Start.siteData.ads
        }),
        ...mapGetters([
            "editTime"
        ]),
        sideAds(){
            if(this.ads){
                for (let index = 0; index < this.ads.length; index++) {
                    const element = this.ads[index];
                    if(element.tag == 'pc'){
                        return element;
                        break;
                    }
                    else{
                        if(index == (this.ads.length -1)){
                            return false
                        }
                    }
                    
                }
            }
            else{
                return false;
            }
        }
    }
}
</script>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'app',
  metaInfo() {
        return{
            title: this.title,
            meta:[
                {
                    name: 'description',
                    content: this.description
                },
                {
                    name: 'twitter:description',
                    content: this.description
                },
                {
                    property: 'og:description',
                    content: this.description
                },
                {
                    property: 'og:title',
                    content: this.title
                },
                {
                    property: 'twitter:title',
                    content: this.title
                },
                {
                    property: 'og:image',
                    content: this.image
                },
                {
                    name: 'twitter:image',
                    content: this.image
                }
            ]
        }
    },
    data(){
        return{
            bannerAd(){
                // admob.setOptions({
                //     publisherId:           "ca-app-pub-4626112194393151/9104095294",  // Required
                //     interstitialAdId:      "ca-app-pub-4626112194393151/8337808531",  // Optional
                //     autoShowBanner:        true,                                      // Optional
                //     autoShowRInterstitial: false,                                     // Optional
                //     autoShowRewarded:      false,                                     // Optional
                //     tappxIdAndroid:        "ca-app-pub-4626112194393151~5739565352",
                //     tappxShare:            0.5                                        // Optional
                // });
                // admob.createBannerView();
            }
        }
    },
    computed:{
      ...mapState({
        "title":          state => state.Start.title,
        "description":    state => state.Start.description,
        "image":          state => state.Start.image
      })
    },
    created(){
        //cordova.on("deviceready",this.bannerAd);
    }
}
</script>

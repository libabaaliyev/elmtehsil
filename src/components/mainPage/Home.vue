<template>
    <div> 
        <Header/>
        <Loader v-if="loader"/>
        <div v-else class="container mt-6">
            <div class="row">
                <div class="col-12 d-lg-none h-50px" v-if="sideAds">
                    <span v-if="sideAds.category =='image'">
                        <a :href="sideAds.url" target="_blank">
                            <img :src="imageRoot + sideAds.image" :alt="sideAds.name" class="img-height">
                        </a>
                    </span>
                    <span v-else v-html="sideAds.code">
                    </span>
                </div>
                <section class="col-lg-9 col-sm-12">
                    <Loader v-if="newsloader"/>
                    <div v-else>
                        <div class="head-section">
                            <ul class="nav nav-tabs">
                                <li v-for="(tab,i) in tabs" :key="i" class="nav-item p-2 pe-5 pointer" 
                                :class="{'border-bottom border-dark border-1': (activeTab == tab.tag)}" 
                                @click="selectTab(tab.tag)">
                                    {{ tab.name }}
                                </li>
                            </ul>
                        </div>
                        <div class="body-section">
                            <div class="recommended" v-if="activeTab == 'recommended'">
                                <News :news="news"/>
                                <Pagination :link="''" :newsCount="newsCount" :currentPag="currentPag"/>
                                
                            </div>
                            <div class="liked" v-else>
                                <News :news="likes"/>
                            </div>
                        </div>
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
import Pagination from '../pageParts/Pagination';
import Loader     from '../pageParts/Loader';
import { mapActions, mapMutations, mapState }   from 'vuex';

export default {
    data(){
        return {
            lastPag: 0,
            current: 1,
            listPag: ["1","2","3","4"]
        }
    },
    methods:{
        ...mapMutations([
            "selectTab",
            "metaCreate"
        ]),
        ...mapActions([
            "getPage"
        ]),
        routeSet(){
            window.scrollTo(0, 0);
            this.metaCreate();
            let page = this.$route.params.page;
            
            if(!page){
                page = 1;
            }
            this.getPage({page,action: 'news',tag: 'get-any'});
        }
    },
    computed:{
        ...mapState({
            "news":         state => state.News.news,
            "likes":        state => state.News.likeNews,
            "newsCount":    state => state.News.count,
            "currentPag":   state => state.News.pagination,
            "tabs":         state => state.Start.tabs,
            "activeTab":    state => state.Start.activeTab,
            "loader":       state => state.Start.loader,
            "newsloader":   state => state.News.loader,
            "title":        state => state.Start.siteData.settings.mainTitle,            
            "ads":          state => state.Start.siteData.ads,
            "imageRoot":    state => state.Start.imageRoot
        }),
        sideAds(){
            for (let index = 0; index < this.ads.length; index++) {
                const element = this.ads[index];
                if(element.tag == 'mobile'){
                    return element;
                    break;
                }
                
            }
        }
    },
    components:{
        Header,
        Footer,
        RightSide,
        News,
        Pagination,
        Loader
    },
    beforeRouteUpdate(to,from,next){        
        next();
        this.routeSet();
    },
    beforeRouteLeave(to,from,next){
       next();
       if(to.name == 'home?page' || to.name == 'home'){
           this.routeSet();
       }
    },
    created(){
        this.routeSet();
    }
}
</script>
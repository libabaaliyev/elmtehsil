<template>
    <div>
        <Header/>
        <Loader v-if="loader"/>
        <div v-else class="container mt-6">
            <div class="row">
                <section class="col-lg-9 col-sm-12">
                    <div v-if="!username">
                        <Team/>
                        <!-- <Pagination :link="'authors'" :newsCount="4" :currentPag="1"/> -->
                    </div>
                    <div v-else>
                        <div class="d-flex align-items-center bg-primary p-3 text-light rounded">
                            <div class="flex-shrink-0 h-100px author media">
                                <div v-if="online">
                                    <img :src="rootImage + team[userIndex]['image']" class="author-img media-object" :alt="team[userIndex]['name']">
                                </div>
                                <div v-else>
                                    <i class="fal fa-user"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1 ms-3">
                                <span class="text-18px">
                                    <b>
                                        {{ team[userIndex]['name'] }}
                                    </b>
                                </span>
                                <br>
                                <p>
                                    {{ team[userIndex]['about'] }}
                                </p>
                                <span class="mt-2"><b>
                                    <span class="me-2"><i class="fal fa-feather"></i> {{ newsCount }}</span> 
                                    <span class="ms-2"><i class="fal fa-eye"></i> {{ hit }}</span>
                                    </b>
                                </span>
                            </div>
                        </div>
                        <News :news="news"/>
                        <Pagination :link="'/authors/' + username" :newsCount="newsCount" :currentPag="currentPag"/>
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
import Header from '../pageParts/Header';
import RightSide from '../pageParts/RightSide';
import Footer from '../pageParts/Footer';
import News from '../pageParts/News';
import Pagination from '../pageParts/Pagination';
import Loader from '../pageParts/Loader';
import Team from '../pageParts/Team';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
    data(){
        return {
            username: '',
            userIndex: -1
        }
    },
    methods:{
        ...mapMutations([
            "selectTab"
        ]),
        ...mapActions([
            "getPage",
            "getCategory"
        ]),
        routeSet(){
            window.scrollTo(0, 0);
            this.username = this.$route.params.username;
            let page      = this.$route.params.page;
            
            if(!this.username){
                this.$store.state.Start.title = "Yazarlar";
                this.$store.dispatch("getDatas");
            }
            else{
                this.userIndex = this.controlTeam((this.username).toString());
                if(!page){
                    page = 1;
                    if(this.userIndex >= 0){
                        this.getCategory({category: this.username,action: 'author'});
                    }
                    else{
                        this.$router.push({name: "author"});
                    }
                }
                else{
                    if(this.userIndex >= 0){
                        this.getPage({page,action: 'news',tag: 'get-author',category: this.username});
                    }
                    else{
                        this.$router.push({name: "author"});
                    }
                }
            }
        }
    },
    computed:{
        ...mapState({
            "news":         state => state.News.news,
            "likes":        state => state.News.likeNews,
            "newsCount":    state => state.News.articleCount,
            "currentPag":   state => state.News.pagination,
            "tabs":         state => state.Start.tabs,
            "activeTab":    state => state.Start.activeTab,
            "loader":       state => state.Start.loader,
            "rootImage":    state => state.Start.imageRoot,
            "team":         state => state.News.team,
            "hit":          state => state.News.hit
        }),
        ...mapGetters([
            "controlTeam"
        ]),
        online(){
            if(navigator.onLine){
                return true;
            }
            else{
                return false;
            }
        }
    },
    components:{
        Header,
        Footer,
        RightSide,
        News,
        Pagination,
        Loader,
        Team
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
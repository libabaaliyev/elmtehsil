<template>
    <div id="lessons">
        <Header/>
        <Loader v-if="loader"/>
        <div v-else class="container mt-6">
            <div class="row">
                <section class="col-lg-9 col-sm-12">
                    <div v-if="!seo">
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
                            <div class="row" v-if="activeTab == 'recommended'">
                                <div class="col-lg-4 col-md-6 col-sm-12 p-2" v-for="(lesson,i) in lessons" :key="i">
                                    <router-link tag="div" :to="'/video-dersler/'+lesson.seo" class="card h-270px">
                                        <img :src="imageRoot + lesson.image" style="height: 170px; min-width: 100%;object-fit: cover" class="card-img-top shadow-sm" :alt="lesson.name">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ lesson.name }}</h5>
                                            <p class="card-text"><small>{{ lesson.title }}</small></p>
                                        </div>
                                    </router-link>
                                </div>

                                <Pagination :link="'/video-dersler'" :newsCount="count" :currentPag="page"/>

                            </div>
                            <div class="liked" v-else>
                                
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        salam
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
import Loader from '../pageParts/Loader';
import Pagination from '../pageParts/Pagination';
import { mapActions, mapMutations, mapState,mapGetters } from 'vuex';
export default {
    components:{
        Header,
        Footer,
        RightSide,
        Loader,
        Pagination
    },
    data(){
        return {
            seo: ''
        }
    },
    methods:{
        ...mapMutations([
            "selectTab"
        ]),
        ...mapActions([
            "getLessons"
        ]),
        routeSet(){
            window.scrollTo(0, 0);
            let page = this.$route.params.page;
            this.seo  = this.$route.params.ders;
            console.log(this.seo);
            if(!page){
                page = 1;
                this.getLessons();
            }
            else{
                this.getLessons({page});
            }

            if(!this.seo){
                this.getLessons();
            }
            
        }
    },
    computed:{
        ...mapState({
            "tabs":         state => state.Start.tabs,
            "activeTab":    state => state.Start.activeTab,
            "loader":       state => state.Start.loader,
            "lessons":      state => state.Lessons.lessons,
            "imageRoot":    state => state.Start.imageRoot,
            "count":        state => state.Lessons.count,
            "page":         state => state.Lessons.page
        })
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

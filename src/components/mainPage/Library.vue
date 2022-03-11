<template>
    <div id="lessons">
        <Header/>
        <Loader v-if="loader"/>
        <div v-else class="container mt-6">
            <div class="row">
                <section class="col-lg-9 col-sm-12">                    
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
                        <div class="row mt-4" v-if="activeTab == 'recommended'">
                            <Books :books="books"/>
                            <Pagination :link="'/kitabxana/'+category" :newsCount="count" :currentPag="page"/>

                        </div>
                        <div class="liked" v-else>
                            <Books :books="likes"/>
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
import Header from '../pageParts/Header';
import RightSide from '../pageParts/RightSide';
import Footer from '../pageParts/Footer';
import Loader from '../pageParts/Loader';
import Pagination from '../pageParts/Pagination';
import Books from '../pageParts/Books';
import { mapActions, mapMutations, mapState,mapGetters } from 'vuex';
export default {
    components:{
        Header,
        Footer,
        RightSide,
        Loader,
        Pagination,
        Books
    },
    data(){
        return {
            category: '',
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    },
    methods:{
        ...mapMutations([
            "selectTab"
        ]),
        ...mapActions([
           "getBooks"
        ]),
        routeSet(){
            window.scrollTo(0, 0);
            let page        = this.$route.params.page;
            this.category   = this.$route.params.bolme;
            let index       = this.controlLibrary(this.category);
            if(index > - 1){
                if(!page){
                    page = 1;
                    this.getBooks({category: this.category});
                }
                else{
                    this.getBooks({category: this.category,page});
                }
            }
            else{
                //this.$router.push({name: "notfound"});
            }
        }
    },
    computed:{
        ...mapState({
            "tabs":         state => state.Start.tabs,
            "activeTab":    state => state.Start.activeTab,
            "loader":       state => state.Start.loader,
            "books":        state => state.Library.books,
            "likes":        state => state.Library.likes,
            "imageRoot":    state => state.Start.imageRoot,
            "count":        state => state.Library.count,
            "page":         state => state.Library.page
        }),
        ...mapGetters([
            "controlLibrary"
        ])
    },
    beforeRouteUpdate(to,from,next){        
        next();
        this.routeSet();
    },
    beforeRouteLeave(to,from,next){
       next();
       //this.routeSet();
    },
    created(){
        this.routeSet();
    }
}
</script>

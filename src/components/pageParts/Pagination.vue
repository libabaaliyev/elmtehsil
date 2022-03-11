<template>
    <div id="pagination">
        <nav class="mt-3" v-if="paginations.length > 1">
            <ul class="pagination justify-content-center">
                <li v-for="i in paginations" :key="i" class="page-item"
                :class="{'active' : (currentPag == i)}"
                >
                    <span class="page-link pointer" v-if="i == '...'">
                        ...
                    </span>
                    <router-link :to="link + '/page/'+i" tag="a" href="#" class="page-link" v-else>
                        {{ i }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    data(){
        return {
            lastPag: 0,
            current: 1
        }
    },
    methods:{
        ...mapActions([
            "getPage"
        ])
    },
    props:["newsCount","currentPag","link"],
    computed:{
        ...mapState({
            "limit":        state => state.Start.pagLimit
        }),
        paginations(){
            if(this.newsCount > 0){
                let pagCount = Math.floor(this.newsCount/this.limit);
                let pag      = [];
                if(pagCount < 5){
                    if(this.newsCount % this.limit == 0){
                        for (let index = 1; index < pagCount+1; index++) {
                            pag.push(index);
                        }
                        return pag;
                    }
                    else{                        
                        for (let index = 1; index < pagCount+2; index++) {
                            pag.push(index);
                        }
                        return pag;
                    }
                }
                else{
                    this.lastPag = pagCount + 1;
                    if(this.currentPag == 1){
                        let numbers = [this.currentPag,2,3,4,'...',this.lastPag];
                        return numbers;
                    }
                    else if(this.currentPag == (this.lastPag - 2)){
                        let numbers = [1,'...',this.currentPag,this.lastPag - 1,this.lastPag];
                        return numbers;
                    }
                    else if(this.currentPag > 1 && this.currentPag < (this.lastPag - 1)){
                        let numbers = [(this.currentPag)-1,this.currentPag,this.currentPag*10/10 + 1,this.currentPag*10/10 + 2,'...',this.lastPag];
                        return numbers;
                    }
                    
                    else if(this.currentPag == (this.lastPag - 1)){
                        let numbers = [1,'...',this.lastPag-2,this.currentPag,this.lastPag];
                        return numbers;
                    }
                    else if(this.currentPag == this.lastPag){
                        let numbers = [1,'...',this.lastPag-2,this.lastPag-1,this.lastPag];
                        return numbers;
                    }
                }
            }
            else{
                return 0;
            }
        }
    }
}
</script>
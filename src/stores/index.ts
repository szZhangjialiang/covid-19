import { defineStore } from "pinia";
import { getApiList } from '../server'
import type { RootObject, Children, ChinaAdd, ChinaTotal, LocalCityNCOVDataList } from './type'
export const useGetListStore = defineStore({
  id: 'index',
  state: () =>({
    list:<RootObject> {},
    childrenItem:<Children[]>[],
    chinaAdd:<ChinaAdd> {},
    chinaTotal:<ChinaTotal> {},
    highRiskNum:<LocalCityNCOVDataList[]>[]
  }),
  actions:{
   async getList(){
     const result =  await getApiList()
     this.list= result
     this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
     this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
     this.highRiskNum = this.list.localCityNCOVDataList.slice(0,4)
     
    }
  }
})
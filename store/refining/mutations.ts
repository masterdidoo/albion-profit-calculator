import { MutationTree } from 'vuex'
import { RefiningState } from './typeDefs'
import { ResponseModel, SettingsWithItem, ItemInfo, OneOfCitiesProp } from './typeDefs'
import { getRawResourceNameByMaterial } from '../utils';
import Vue from 'vue';

export const mutations: MutationTree<RefiningState> = {
  /**
   * Set json files data into state
   * 
   * @param state - vuex state
   */
  SET_STATE(state) {
    state.settings = {
      useFocus: false,
      fee: 10,
      useOwnPercentage: false,
      returnPercentage: 15.2,
      useMultipleCities: false,
      cities: {
        sellMaterials: 'Caerleon',
        refiningResources: 'Caerleon',
        buyMaterials: 'Caerleon',
        buyRawResources: 'Caerleon'
      }
    };
    state.currentItemInfo = {
      name: '',
    };
    state.features = {
      loadingText: 'calculated'
    }
  },

  /**
   * Set information about selected material
   * 
   * @param state - vuex state
   * @param itemInfo - material info
   */
  SET_ITEM_INFO(state, itemInfo: ItemInfo) {
    state.currentItemInfo = itemInfo;
  },

  /**
   * Set raw resources prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_RAW_RESOURCES(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = getRawResourceNameByMaterial(settingsWithItem.currentItemInfo.name);
    const location = settingsWithItem.settings.cities.buyRawResources;

    Vue.set(state.rawResources[location], itemName, data);
  },

  /**
   * Set material prices where we sell them
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_SELL_MATERIALS(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.sellMaterials;

    Vue.set(state.materials[location], itemName, data);
  },

  /**
   * Set material prices where we buy them
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_BUY_MATERIALS(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.buyMaterials;

    Vue.set(state.materials[location], itemName, data);
  },

  UPDATE_USE_MULTIPLE_CITIES(state, useMultipleCities: boolean) {
    state.settings.useMultipleCities = useMultipleCities;
  },

  /**
   * Update use focus param
   * 
   * @param state - vuex state
   * @param useFocus - use focus points or not
   */
  UPDATE_USE_FOCUS(state, useFocus: boolean) {
    state.settings.useFocus = useFocus;
  },

  /**
   * Update craft fee
   * 
   * @param state - vuex state
   * @param fee - craft fee
   */
  UPDATE_FEE(state, fee: number) {
    state.settings.fee = fee;
  },

  SET_CITIES(state, cities: OneOfCitiesProp) {
    Object.assign(state.settings.cities, cities);
  },

  /**
   * Update use own return percentage param
   * 
   * @param state - vuex state
   * @param useOwnPercentage - use own return percentage or not
   */
  UPDATE_USE_OWN_PERCENTAGE(state, useOwnPercentage: boolean) {
    state.settings.useOwnPercentage = useOwnPercentage;
  },

  /**
   * Update own return percentage
   * 
   * @param state - vuex state
   * @param returnPercentage - own return percentage
   */
  UPDATE_RETURN_PERCENTAGE(state, returnPercentage: number) {
    state.settings.returnPercentage = returnPercentage;
  },

  /**
   * Set loading text
   * 
   * @param state - vuex state
   * @param loadingText - text of loading
   */
  SET_LOADING_TEXT(state, loadingText: string) {
    state.features.loadingText = loadingText;
  },
}
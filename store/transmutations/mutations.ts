import { MutationTree } from 'vuex'
import { TransmutationsState, ItemInfo, Settings, ResponseModel, SettingsWithItem } from './typeDefs'
import Vue from 'vue';

export const mutations: MutationTree<TransmutationsState> = {
  /**
   * Set json files data into state
   * 
   * @param state - vuex state
   */
  SET_STATE(state) {
    state.settings = {
      fee: 10,
      gold: 2980,
      cities: {
        buyResourcesLocation: 'Caerleon',
        sellResourcesLocation: 'Caerleon'
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
   * Set item prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_SELL_ITEM_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.sellResourcesLocation;

    Vue.set(state.prices[location], itemName, data);
  },

  /**
   * Set item prices to state
   * 
   * @param state - vuex state
   * @param data - api response
   * @param settingsWithItem - сonvenient item data and settings 
   */
  SET_BUY_ITEM_PRICES(state, { data, settingsWithItem }: { data: ResponseModel[], settingsWithItem: SettingsWithItem}) {
    const itemName = settingsWithItem.currentItemInfo.name;
    const location = settingsWithItem.settings.cities.buyResourcesLocation;

    Vue.set(state.prices[location], itemName, data);
  },

  /**
   * Set information about selected resoruce
   * 
   * @param state - vuex state
   * @param resourceName - resource name
   */
  SET_ITEM_INFO(state, itemInfo: ItemInfo) {
    state.currentItemInfo = itemInfo;
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

  /**
   * Update gold
   * 
   * @param state - vuex state
   * @param gold - market gold price
   */
  UPDATE_GOLD(state, gold: number) {
    state.settings.gold = gold;
  },

  /**
   * Update fee
   * 
   * @param state - vuex state
   * @param fee - fee
   */
  UPDATE_FEE(state, fee: number) {
    state.settings.fee = fee;
  },

  /**
   * Update resource prices locations
   * 
   * @param state - vuex state
   * @param fee - fee
   */
  UPDATE_CITIES(state, cities: Settings['cities']) {
    state.settings.cities = cities;
  }
}
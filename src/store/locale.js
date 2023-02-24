import { createSlice } from '@reduxjs/toolkit';
import { addPrefixName } from './../utils/index';
import config from './../config/index';
import { getBrowserLang } from "./../utils";

const defaultBrowserLang = getBrowserLang();

// 设置过本地的则使用本地的
let localeStorage = window.localStorage.getItem(addPrefixName('locale')) || '';
if (localeStorage) {
  localeStorage = JSON.parse(localeStorage)
} else {
  // 未设置本地的，则优先使用 config.locale ，否则从浏览器获取到的语言 navigator.language || navigator.browserLanguage
  if (!config.locale && config.isShowToggleLang) {
    localeStorage = defaultBrowserLang
  } else {
    localeStorage = config.locale
  }
}

export const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    value: localeStorage,
    list: [
      {
        value: 'zh-CN',
        label: '中文',
      },
      {
        value: 'en-US',
        label: 'English',
      }
    ]
  },
  reducers: {
    changeLocale: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { changeLocale } = localeSlice.actions;

export default localeSlice.reducer;


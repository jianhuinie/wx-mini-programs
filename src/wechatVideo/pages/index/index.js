import config from '../../utils/config';
import wxService from '../../utils/wxService';
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
// const TOKEN = config.TOKEN;

Page({
	data: {
		funVideos: [],
		positiveVideos: [],
		activedTab: 1
	},
	onLoad: function () {
		var self = this;
		wxService.sendWxRequest({
			url: serverHost + PATHS.RECOMMEND,
			data: {},
			method: 'POST',
			doneHandler: function (res) {
				self.setData({
					funVideos: res.recommend_video,
					positiveVideos: res.positive_video
				});
			}
		})
	},
	onShow: function () {

	},
	jumpDetail: function (e) {
		var item = e.currentTarget.dataset.item;
		var itemStr = JSON.stringify(item);
		wx.navigateTo({
			url: '/pages/videoDetail/index?item=' + itemStr
		});
	},
	onShareAppMessage: function (options) {

	}
});
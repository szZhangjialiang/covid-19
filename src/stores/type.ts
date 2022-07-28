export interface ShowAddSwitch {
	heal: boolean;
	localConfirm: boolean;
	all: boolean;
	confirm: boolean;
	suspect: boolean;
	dead: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	importedCase: boolean;
	noInfect: boolean;
	localinfeciton: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	showRate: boolean;
	continueDayZeroLocalConfirmAdd: number;
	confirm: number;
	wzz: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	adcode: string;
	nowConfirm: number;
	dead: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	heal: number;
	mtime: string;
}

export interface Today {
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
	local_confirm_add: number;
}

export interface Total {
	confirm: number;
	dead: number;
	wzz: number;
	continueDayZeroConfirmAdd: number;
	adcode: string;
	heal: number;
	mtime: string;
	nowConfirm: number;
	showRate: boolean;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	showHeal: boolean;
	highRiskAreaNum: number;
	continueDayZeroConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: number;
	local_confirm_add: number;
}

export interface Total {
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	showRate: boolean;
	mediumRiskAreaNum: number;
	nowConfirm: number;
	confirm: number;
	showHeal: boolean;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	dead: number;
	heal: number;
	wzz: number;
	adcode: string;
}

// export interface Children {
// 	name: string;
// 	adcode: string;
// 	date: string;
// 	today: Today;
// 	total: Total;
// }

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface AreaTree {
	today: Today;
	total: Total;
	children: Children[];
	name: string;
}

export interface ChinaTotal {
	dead: number;
	showLocalConfirm: number;
	noInfectH5: number;
	deadAdd: number;
	mediumRiskAreaNum: number;
	nowConfirm: number;
	nowSevere: number;
	importedCase: number;
	local_acc_confirm: number;
	mtime: string;
	localConfirmAdd: number;
	confirm: number;
	suspect: number;
	showlocalinfeciton: number;
	localConfirmH5: number;
	localWzzAdd: number;
	nowLocalWzz: number;
	heal: number;
	noInfect: number;
	confirmAdd: number;
	highRiskAreaNum: number;
	localConfirm: number;
	mRiskTime: string;
}

export interface ChinaAdd {
	nowSevere: number;
	importedCase: number;
	localConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
	confirm: number;
	heal: number;
	dead: number;
	nowConfirm: number;
	suspect: number;
	noInfect: number;
}

export interface Diseaseh5Shelf {
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
}

export interface LocalCityNCOVDataList {
	date: string;
	isUpdated: boolean;
	mtime: string;
	local_wzz_add: string;
	mediumRiskAreaNum: number;
	province: string;
	city: string;
	adcode: string;
	local_confirm_add: number;
	highRiskAreaNum: number;
	isSpecialCity: boolean;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	localCityNCOVDataList: LocalCityNCOVDataList[];
}
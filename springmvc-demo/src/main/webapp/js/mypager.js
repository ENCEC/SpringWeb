/**
 * 获取参数
 */
function getParam(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
}
/**
 * 替换url参数
 */
function getUrl(name,value){
	var oUrl = window.location.href; 
	var reg = new RegExp("(^|&)(" + name + "=)([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) {
		return oUrl.replace(eval('/'+r[0]+'/g'),r[1]+r[2]+value+r[4]);
	}else{
		return oUrl+(oUrl.indexOf('?')>0? '&':'?')+name+'='+value;
	}
}
/**
 * js分页
 */
function Pager(obj){
	var totalCount = parseInt(obj.totalCount || 0);//总条数
	var pageSize   = parseInt(obj.pageSize || 10);//每页显示条数
	var buttonSize = parseInt(obj.buttonSize || 10);//显示的按钮数
	var pageParam  = obj.pageParam || 'page';//分页的参数
	var className  = obj.className || 'pagination';//分页的样式
	var prevButton = obj.prevButton || '&laquo;';//向前翻按钮
	var nextButton = obj.nextButton || '&raquo;';//向后翻按钮
	
	if(totalCount==0 || totalCount<=pageSize) return '';

	var page = parseInt(getParam('page'))||0;
	page= page>1? page : 1;

	var str = '<ul class="'+className+'">';
	if(page <= 1){
		str += '<li class="prev disabled"><span>'+prevButton+'</span></li>';
	}else{
		str += '<li class="prev"><a href="'+getUrl(pageParam,page-1)+'">'+prevButton+'</a></li>';
	}
	var max = Math.ceil(totalCount/pageSize);
	var start = Math.floor((page-2)/(buttonSize-2))*(buttonSize-2);
	start = start+buttonSize>max? max-buttonSize : start;
	start = start>=0? start : 0;
	for(var i=start+1;i<=start+buttonSize;i++){
		if(i>max || buttonSize<3) break;
		str += '<li'+(i==page?' class="active"' : '')+'><a href="'+getUrl(pageParam,i)+'">'+i+'</a></li>';
	}
	if(page >= max){
		str += '<li class="next disabled"><span>'+nextButton+'</span></li>';
	}else{
		str += '<li class="next"><a href="'+getUrl(pageParam,page+1)+'">'+nextButton+'</a></li>';
	}
	return str+'</ul>';
}

const BASE_ROOT = "http://103.48.232.122:8080/nnlightctl";
const PAGE_SIZE = 10;

const SEX = {
    0 : "女",
    1 : "男"
};

const USER_STATE = {
    0 : "删除",
    1 : "正常",
    2 : "锁定"
};

const USER_TYPE = {
    0 : "超级管理员用户",
    1 : "机构管理员用户",
    2 : "部门用户"
};

const PROJECT_STATE = {
    0 : "未启用",
    1 : "已启用"
};

const PERIOD_TYPE = {
    1 : "平常",
    2 : "周末",
    3 : "平常,周末",
    4 : "节假日",
    5 : "平常，节假日",
    6 : "周末，节假日",
    7 : "平常，周末，节假日"
};

const TASKSWITCH_LIGHTON = {
    0 : "否",
    1 : "是"
};

const MODELLOOP_STATE = {
    0 : "通电",
    1 : "断电",
    2 : "故障"
};
const online_state = {
    0 : "不在线",
    1 : "在线"
};
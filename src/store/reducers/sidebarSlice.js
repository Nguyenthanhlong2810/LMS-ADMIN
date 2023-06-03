import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const fullSidebarItems = [
  {
    id: 1,
    title: 'Quản lý hoạt động đào tạo',
    path: '',
    isOpen: false,
    subItems: [{ id: uuidv4(), title: 'Gán/ Huỷ khoá học', path: '/training/assign-course' }]
  },
  {
    id: 2,
    title: 'Quản lý hoạt động học tập',
    path: '',
    isOpen: false,
    subItems: [
      { id: uuidv4(), title: 'Hạng mục đào tạo', path: '/learning/category-training' },
      { id: uuidv4(), title: 'Mã chương trình', path: '/learning/program-code' },
      { id: uuidv4(), title: 'Khóa học', path: '/learning/courses' }
      // { title: 'Học viên đã gán', path: '/learning/user-assigned' },
      // {
      //   id: 11,
      //   title: 'Luồng phê duyệt',
      //   path: '',
      //   isOpen: false,
      //   subItems: [
      //     {
      //       id: 12,
      //       title: 'Cấu hình luồng phê duyệt',
      //       path: '/learning/approval-course/',
      //       isOpen: false
      //     },
      //     {
      //       id: 13,
      //       title: 'Danh sách phê duyệt',
      //       path: '',
      //       isOpen: false,
      //       subItems: [
      //         {
      //           title: 'Chương trình nội bộ',
      //           path: '/learning/approval-list/internal'
      //         },
      //         {
      //           title: 'Chương trình bên ngoài',
      //           path: '/learning/approval-list/external'
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    id: 3,
    title: 'Sự kiện',
    path: '',
    isOpen: false,
    subItems: []
  },
  {
    id: 4,
    title: 'Nội dung',
    path: '',
    isOpen: false,
    subItems: [
      { id: uuidv4(), title: 'Import nội dung', path: '/content/import-content' },
      { id: uuidv4(), title: 'Bài kiểm tra', path: '/content/examination' },
      { id: uuidv4(), title: 'Ngân hàng câu hỏi', path: '/content/question-bank' },
      { id: uuidv4(), title: 'Khảo sát', path: '/content/survey' }
    ]
  },
  {
    id: 5,
    title: 'Quản lý người dùng',
    path: '',
    isOpen: false,
    subItems: []
  },
  {
    id: 6,
    title: 'Thảo luận',
    path: '',
    isOpen: false,
    subItems: []
  },
  {
    id: 7,
    title: 'Tin tức',
    path: '/news',
    isOpen: false,
    subItems: []
  },
  {
    id: 8,
    title: 'Báo cáo',
    path: '',
    isOpen: false,
    subItems: []
  },
  {
    id: 9,
    title: 'Cài đặt',
    path: '',
    subItems: [
      { id: uuidv4(), title: 'Thông tin trang giới thiệu', path: '/setting/intro-page' },
      { id: uuidv4(), title: 'Cấu hình lần đầu đăng nhập', path: '/setting/config-first-login' },
      { id: uuidv4(), title: 'Cấu hình FAQ- Chủ đề', path: '/setting/faq-topic' },
      { id: uuidv4(), title: 'Cấu hình FAQ- Câu hỏi', path: '/setting/faq-question' },
      { id: uuidv4(), title: 'Cấu hình banner', path: '/setting/banner' },
      { id: uuidv4(), title: 'Điều khoản sử dụng', path: '/setting/terms-of-use' },
      { id: uuidv4(), title: 'Thông tin liên hệ', path: '/setting/contact-info' }
    ],
    isOpen: false
  }
];
const initialState = {
  listSidebarItems: cloneDeep(fullSidebarItems),
  activeParentId: null,
  activeChildId: null
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state, action) => {
      const foundItem = findClickedItem(state.listSidebarItems, action.payload);
      if (foundItem) {
        foundItem.isOpen = !foundItem.isOpen;
      }
      // state.listSidebarItems[foundIndex].isOpen = !state.listSidebarItems[foundIndex].isOpen;
    },
    open: (state, action) => {
      const item = state.listSidebarItems.find((c) => c.id === action.payload);
      if (item) {
        item.isOpen = true;
      }
    },
    setListMenu: (state, action) => {
      if (!action.payload || action.payload.trim() === '')
        state.listSidebarItems = fullSidebarItems;
      const newMenu = findMenu(cloneDeep(fullSidebarItems), action.payload);
      state.listSidebarItems = newMenu;
    },
    active: (state, action) => {
      state.activeChildId = action.payload.childId;
      state.activeParentId = action.payload.parentId;
    },
    reset: (state) => {
      state.listSidebarItems = cloneDeep(fullSidebarItems);
      state.activeParentId = null;
      state.activeChildId = null;
    }
  }
});
const findMenu = (list, text) => {
  const newListMenu = [];
  list.forEach((menuItem) => {
    if (menuItem.title.toLowerCase().includes(text.toLowerCase())) {
      newListMenu.push(menuItem);
      return;
    }
    if (menuItem.subItems?.length > 0) {
      const newSubMenu = findMenu(menuItem.subItems, text);
      if (newSubMenu.length > 0) {
        menuItem.isOpen = true;
        menuItem.subItems = newSubMenu;
        newListMenu.push(menuItem);
        return;
      }
    }
  });
  return newListMenu;
};
const findClickedItem = (list, id) => {
  for (let item of list) {
    if (item.id === id) {
      return item;
    } else if (item.subItems?.length) {
      const foundChild = findClickedItem(item.subItems, id);
      if (foundChild) {
        return foundChild;
      }
    }
  }
  return null;
};

export const { toggle, open, setListMenu, active, reset } = sidebarSlice.actions;

export default sidebarSlice.reducer;

export function getHTML() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ImgNaondo 图床</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f9fa; color: #333; line-height: 1.6; }
    .header { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 16px 24px; position: sticky; top: 0; z-index: 100; }
    .header-content { display: flex; justify-content: space-between; align-items: center; max-width: 1400px; margin: 0 auto; }
    .header h1 { font-size: 22px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 8px; }
    .header-controls { display: flex; align-items: center; gap: 10px; }
    .container { max-width: 1400px; margin: 0 auto; padding: 24px; }
    @media (max-width: 768px) {
      .container { padding: 16px; }
      .header-content { flex-direction: column; align-items: flex-start; gap: 10px; }
      .toolbar { flex-direction: column; align-items: stretch; gap: 12px; }
      .toolbar-section { flex-direction: column; align-items: stretch; gap: 8px; }
      .search-box { max-width: none; }
      .upload-inputs { flex-direction: column; }
      .upload-inputs input { max-width: none; min-width: auto; }
      .gallery { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
      .image-info { padding: 12px; }
      .image-name { font-size: 13px; }
      .modal-content { padding: 24px; }
      .toast { top: 70px; right: 16px; left: 16px; }
    }
    .login-box { max-width: 380px; margin: 100px auto; background: #fff; padding: 32px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    @media (max-width: 480px) {
      .login-box { margin: 60px auto; padding: 24px; }
      .header { padding: 12px 16px; }
      .header h1 { font-size: 18px; }
    }
    .login-box h2 { margin-bottom: 24px; text-align: center; font-size: 24px; font-weight: 600; color: #1f2937; }
    input, select, textarea { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; margin-bottom: 16px; background: #fff; transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit; height: 40px; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
    input::placeholder, textarea::placeholder { color: #9ca3af; }
    button { padding: 10px 18px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background-color 0.2s, transform 0.1s; height: 40px; display: inline-flex; align-items: center; justify-content: center; }
    button:hover { background: #2563eb; }
    button:active { transform: scale(0.98); }
    button:disabled { background: #d1d5db; cursor: not-allowed; transform: none; }
    .btn-danger { background: #ef4444; }
    .btn-danger:hover { background: #dc2626; }
    .btn-success { background: #10b981; }
    .btn-success:hover { background: #059669; }
    .toolbar { background: #fff; padding: 12px 16px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
    .toolbar-section { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .stats { display: flex; gap: 16px; margin-left: auto; font-size: 14px; color: #6b7280; align-items: center; }
    .stats strong { color: #1f2937; font-weight: 600; }
    .upload-box { background: #fff; border: 2px dashed #d1d5db; border-radius: 12px; padding: 24px 20px; text-align: center; cursor: pointer; margin-bottom: 20px; transition: all 0.2s; }
    .upload-box:hover { border-color: #3b82f6; background: #f9fafb; }
    .upload-box.dragging { border-color: #3b82f6; background: #eff6ff; }
    .tag-cloud { background: #fff; padding: 16px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .tag-cloud-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .tag-cloud-header h3 { font-size: 15px; font-weight: 600; color: #1f2937; }
    .tag-cloud-toggle { background: transparent; color: #3b82f6; padding: 5px 10px; font-size: 13px; border: none; height: auto; }
    .tag-cloud-toggle:hover { background: #eff6ff; border-radius: 6px; }
    .tag-cloud-content { display: flex; flex-wrap: wrap; gap: 8px; max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
    .tag-cloud-content.expanded { max-height: 500px; }
    .tag-item { display: inline-flex; align-items: center; padding: 6px 14px; background: #f3f4f6; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; user-select: none; color: #4b5563; }
    .tag-item:hover { background: #3b82f6; color: white; }
    .tag-item.active { background: #3b82f6; color: white; }
    .tag-item .tag-count { margin-left: 6px; font-size: 11px; opacity: 0.9; font-weight: 600; }
    .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .image-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); position: relative; transition: all 0.2s; border: 1px solid #e5e7eb; }
    .image-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .image-card.selected { outline: 2px solid #3b82f6; outline-offset: 2px; }
    .image-card img { width: 100%; height: 200px; object-fit: cover; display: block; cursor: zoom-in; transition: transform 0.2s; }
    .image-card:hover img { transform: scale(1.03); }
    .image-info { padding: 14px; }
    .image-name { font-weight: 600; margin-bottom: 6px; font-size: 14px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #1f2937; }
    .image-meta { font-size: 12px; color: #6b7280; margin-bottom: 3px; display: flex; align-items: center; gap: 4px; }
    .image-tags { font-size: 12px; margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 4px; }
    .image-tag { background: #eff6ff; color: #3b82f6; padding: 2px 8px; border-radius: 10px; font-weight: 500; }
    .image-actions { display: flex; gap: 6px; flex-wrap: wrap; }
    .image-actions button { flex: 1; padding: 6px 10px; font-size: 12px; min-width: 60px; height: 30px; }
    .checkbox { position: absolute; top: 10px; left: 10px; width: 20px; height: 20px; cursor: pointer; z-index: 10; border-radius: 4px; accent-color: #3b82f6; }
    .modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center; }
    .modal.show { display: flex; }
    .modal-content { background: #fff; padding: 28px; border-radius: 12px; max-width: 480px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
    .modal-content h3 { margin-bottom: 20px; font-size: 20px; font-weight: 600; color: #1f2937; }
    .form-group { margin-bottom: 18px; }
    .form-group label { display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px; color: #374151; }
    .form-group input { width: 100%; }
    .modal-actions { display: flex; gap: 10px; margin-top: 20px; align-items: center; }
    .modal-actions button { flex: 1; height: 40px; }
    .toast { position: fixed; top: 80px; right: 24px; background: #1f2937; color: white; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; z-index: 2000; animation: slideIn 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .hidden { display: none !important; }
    .search-box { flex: 1; max-width: 320px; margin-bottom: 0; }
    select { width: auto; padding: 10px 12px; margin-bottom: 0; height: 40px; min-width: 120px; }
    .bulk-actions { display: none; gap: 10px; align-items: center; }
    .bulk-actions.show { display: flex; }
    .bulk-actions button { height: 40px; }
    .bulk-actions span { height: 40px; display: flex; align-items: center; }
    .no-images { text-align: center; padding: 60px 20px; color: #9ca3af; font-size: 16px; background: #fff; border-radius: 12px; border: 2px dashed #e5e7eb; }
    .upload-inputs { margin-top: 16px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; align-items: stretch; }
    .upload-inputs input { max-width: 280px; display: inline-block; margin-bottom: 0; flex: 1; min-width: 200px; }
    .footer { text-align: center; padding: 24px; margin-top: 48px; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; background: #fff; }
    .footer a { color: #3b82f6; text-decoration: none; font-weight: 500; }
    .footer a:hover { text-decoration: underline; }
    .lightbox.modal { align-items: center; justify-content: center; }
    .lightbox-img { max-width: 90vw; max-height: 90vh; border-radius: 8px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
    .lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); border: none; background: rgba(255,255,255,0.9); color: #1f2937; font-size: 28px; padding: 10px 14px; border-radius: 8px; cursor: pointer; z-index: 1001; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.2); height: auto; }
    .lightbox-nav:hover { background: #3b82f6; color: white; }
    .lightbox-nav.prev { left: 20px; }
    .lightbox-nav.next { right: 20px; }
    .copy-dropdown { position: relative; flex: 1; }
    .copy-dropdown-menu {
      position: absolute;
      left: 0;
      bottom: calc(100% + 6px);
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      padding: 6px;
      min-width: 140px;
      z-index: 50;
      opacity: 0;
      transform: translateY(10px);
      visibility: hidden;
      pointer-events: none;
      transition: all 0.2s ease;
    }
    .copy-dropdown.open .copy-dropdown-menu {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
      pointer-events: auto;
    }
    .copy-dropdown-menu button {
      width: 100%;
      padding: 8px 12px;
      background: transparent;
      color: #374151;
      text-align: left;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      height: auto;
    }
    .copy-dropdown-menu button:hover {
      background: #f3f4f6;
      color: #1f2937;
    }
    .loader { text-align: center; padding: 24px; color: #6b7280; font-size: 14px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .loader::after {
      content: '';
      width: 24px;
      height: 24px;
      border: 2px solid #e5e7eb;
      border-top: 2px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .header-controls button { height: 36px; padding: 8px 14px; }
    .upload-box button { margin-top: 12px; height: 40px; min-width: 120px; }
    .upload-box h3 { font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 4px; }
    .upload-box p { color: #6b7280; margin-top: 4px; font-size: 13px; }
    .upload-inputs { margin-top: 12px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; align-items: stretch; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-content">
      <h1>🖼️ ImgNaondo 图床</h1>
      <div class="header-controls">
        <button id="logoutButton" class="hidden btn-danger" onclick="logout()" style="padding: 8px 14px;">退出登录</button>
        <button id="syncBtn" class="hidden" onclick="startSync()" style="padding: 8px 14px; background: #f59e0b; color: white; border: none; border-radius: 8px; cursor: pointer;" title="同步 R2 到 D1">↻ 同步</button>
      </div>
    </div>
  </div>
  <div id="loginSection" class="login-box">
    <h2>登录</h2>
    <input type="password" id="passwordInput" placeholder="输入访问密码" onkeypress="if(event.key==='Enter')performLogin()">
    <button style="width: 100%;" onclick="performLogin()">登录</button>
  </div>
  <div id="mainSection" class="container hidden">
    <div class="upload-box" id="uploadArea">
      <div style="font-size: 36px; margin-bottom: 6px;">☁️</div>
      <h3>点击或拖拽图片至此</h3>
      <p>支持 JPG, PNG, GIF, WebP, SVG, BMP</p>
      <input type="file" id="fileInput" accept="image/*" multiple style="display: none;" onchange="handleFileSelect(this.files)">
      <div class="upload-inputs">
        <input type="text" id="uploadCustomName" placeholder="自定义名称（可选）" onclick="event.stopPropagation()">
        <input type="text" id="uploadTags" placeholder="标签（逗号分隔）" onclick="event.stopPropagation()">
      </div>
      <button onclick="event.stopPropagation(); document.getElementById('fileInput').click()">选择文件</button>
      <div id="uploadProgress" style="margin-top: 12px; color: #6b7280; font-size: 13px;"></div>
    </div>
    <div class="tag-cloud" id="tagCloud">
      <div class="tag-cloud-header">
        <h3>🏷️ 标签云</h3>
        <button class="tag-cloud-toggle" onclick="toggleTagCloud()">展开</button>
      </div>
      <div class="tag-cloud-content" id="tagCloudContent"></div>
    </div>
    <div class="toolbar">
      <div class="toolbar-section">
        <input type="text" id="searchInput" class="search-box" placeholder="按名称或标签搜索...">
        <select id="sortSelect" onchange="resetAndLoad()">
        </select>
        <button onclick="toggleSelectMode()">批量选择</button>
      </div>
      <div class="bulk-actions" id="bulkActions">
        <button class="btn-danger" onclick="batchDelete()">删除选中</button>
        <button onclick="selectAll()">全选</button>
        <button onclick="deselectAll()">取消选择</button>
        <span id="selectedCount" style="color: #6b7280;">已选: 0</span>
      </div>
      <div class="stats">
        <span>📊 总数: <strong id="totalImages">0</strong></span>
        <span>💾 占用: <strong id="totalSize">0 MB</strong></span>
      </div>
    </div>
    <div class="gallery" id="gallery"></div>
    <div id="infiniteLoader" class="loader hidden">加载中...</div>
    <div id="endMessage" class="loader hidden">没有更多图片了</div>
  </div>
  <div class="modal" id="editModal" onclick="if(event.target===this)closeEditModal()">
    <div class="modal-content">
      <h3>编辑图片信息</h3>
      <div class="form-group">
        <label>自定义名称</label>
        <input type="text" id="editCustomName">
      </div>
      <div class="form-group">
        <label>标签（逗号分隔）</label>
        <input type="text" id="editTags" placeholder="风景, 旅行, 2024">
      </div>
      <div class="form-group">
        <label>原始文件名</label>
        <input type="text" id="editOriginalName" disabled>
      </div>
      <div class="modal-actions">
        <button class="btn-success" onclick="saveEdit()">保存</button>
        <button onclick="closeEditModal()">取消</button>
      </div>
    </div>
  </div>
  <div class="modal lightbox" id="lightbox" onclick="if(event.target===this)closeLightbox()">
    <button class="lightbox-nav prev" onclick="prevImage(event)">‹</button>
    <img id="lightboxImg" class="lightbox-img" src="" alt="">
    <button class="lightbox-nav next" onclick="nextImage(event)">›</button>
  </div>
  <footer class="footer">
    <p>&copy; <span id="currentYear"></span> Created by <a href="https://github.com/xdanielf/" target="_blank" rel="noopener noreferrer">xdanielf</a>.</p>
  </footer>
  <script>
    const PASSWORD_KEY = 'imgnaondo_password';
    const LOGIN_TIME_KEY = 'imgnaondo_login_time';
    const SESSION_DURATION = 24 * 60 * 60 * 1000;
    const SCROLL_THRESHOLD = 300;
     
    let password = '';
    let currentLibrary = [];
    
    let selectedImages = new Set();
    let selectMode = false;
    let currentEditKey = '';
    let activeTag = null;
    let tagCloudExpanded = false;
    let isLoadingLibrary = false;
    let lightboxIndex = -1;
    let allTags = [];
    
    let nextCursor = 0; 
    let hasMoreImages = true;

    function init() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        initSortOptions();
        checkLogin();
    }

    function initSortOptions() {
        const sortSelect = document.getElementById('sortSelect');
        const options = [
            { value: 'time-desc', text: '最新上传' },
            { value: 'time-asc', text: '最早上传' },
            { value: 'size-desc', text: '体积最大' },
            { value: 'size-asc', text: '体积最小' },
            { value: 'name-asc', text: '名称 A-Z' },
            { value: 'name-desc', text: '名称 Z-A' }
        ];
        sortSelect.innerHTML = options.map(opt => '<option value="' + opt.value + '">' + opt.text + '</option>').join('');
    }

    function t(key, ...args) {
        const translations = {
            title: "ImgNaondo 图床",
            logout: "退出登录",
            login_title: "登录",
            ph_password: "输入访问密码",
            login_btn: "登录",
            upload_drag: "点击或拖拽图片至此",
            upload_support: "支持 JPG, PNG, GIF, WebP, SVG, BMP",
            ph_custom_name: "自定义名称（可选）",
            ph_tags: "标签（逗号分隔）",
            select_files: "选择文件",
            tag_cloud: "🏷️ 标签云",
            expand: "展开",
            collapse: "收起",
            ph_search: "按名称或标签搜索...",
            bulk_select: "批量选择",
            delete_selected: "删除选中",
            select_all: "全选",
            deselect: "取消选择",
            stat_total: "📊 总数:",
            stat_storage: "💾 占用:",
            loading: "加载中...",
            no_more: "没有更多图片了",
            no_images_found: "未找到图片",
            edit_title: "编辑图片信息",
            lbl_custom_name: "自定义名称",
            lbl_tags: "标签（逗号分隔）",
            lbl_original: "原始文件名",
            save: "保存",
            cancel: "取消",
            copy: "复制",
            edit: "编辑",
            del: "删除",
            sort_newest: "最新上传",
            sort_oldest: "最早上传",
            sort_largest: "体积最大",
            sort_smallest: "体积最小",
            sort_az: "名称 A-Z",
            sort_za: "名称 Z-A",
            toast_enter_pass: "请输入密码",
            toast_incorrect: "密码错误",
            toast_login_fail: "登录失败: ",
            toast_error_load: "加载图库失败",
            toast_uploading: "正在上传 {0} / {1}...",
            toast_uploaded: "已上传 {0} 张图片",
            confirm_del: "确定删除这张图片吗？",
            confirm_batch: "确定删除 {0} 张图片吗？",
            toast_deleted: "已删除",
            toast_batch_success: "批量删除成功",
            toast_batch_fail: "批量删除失败",
            toast_saved: "已保存",
            toast_no_select: "未选择图片",
            toast_copy_ok: "✓ 已复制",
            toast_copy_fail: "✗ 复制失败",
            toast_login_first: "请先登录",
            msg_selected: "已选: {0}",
            tag_no_tags: "暂无标签",
            toast_sync_start: "开始同步...",
            toast_sync_progress: "同步中... 已处理 {0} 项",
            toast_sync_complete: "同步完成！共迁移 {0} 项。"
        };
        let text = translations[key] || key;
        args.forEach((arg, i) => {
            text = text.replace('{' + i + '}', arg);
        });
        return text;
    }
    
    function checkLogin() {
        const savedPassword = localStorage.getItem(PASSWORD_KEY);
        const loginTime = localStorage.getItem(LOGIN_TIME_KEY);
        if (savedPassword && loginTime && Date.now() - parseInt(loginTime) < SESSION_DURATION) {
            password = savedPassword;
            showMainSection();
        }
    }
    
    async function performLogin() {
        const input = document.getElementById('passwordInput');
        const pass = input.value.trim();
        if (!pass) return showToast(t('toast_enter_pass'));
        
        try {
            const res = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + pass }
            });
            
            if (res.ok) {
                password = pass;
                localStorage.setItem(PASSWORD_KEY, pass);
                localStorage.setItem(LOGIN_TIME_KEY, Date.now().toString());
                showMainSection();
            } else {
                showToast(t('toast_incorrect'));
            }
        } catch (e) {
            showToast(t('toast_login_fail') + e.message);
        }
    }
    
    function logout() {
        localStorage.removeItem(PASSWORD_KEY);
        localStorage.removeItem(LOGIN_TIME_KEY);
        password = '';
        document.getElementById('mainSection').classList.add('hidden');
        document.getElementById('loginSection').classList.remove('hidden');
        document.getElementById('logoutButton').classList.add('hidden');
        document.getElementById('syncBtn').classList.add('hidden');
    }
    
    function showMainSection() {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('mainSection').classList.remove('hidden');
        document.getElementById('logoutButton').classList.remove('hidden');
        document.getElementById('syncBtn').classList.remove('hidden');
        loadData();
    }
    
    async function loadData() {
      resetAndLoad();
      loadStats();
      loadTags();
    }
    
    function resetAndLoad() {
        currentLibrary = [];
        nextCursor = 0;
        hasMoreImages = true;
        document.getElementById('gallery').innerHTML = '';
        document.getElementById('endMessage').classList.add('hidden');
        fetchNextPage();
    }
    
    async function startSync() {
        if(!confirm(t('toast_sync_start'))) return;
        
        const btn = document.getElementById('syncBtn');
        btn.disabled = true;
        
        let cursor = null;
        let total = 0;
        let isLooping = true;
        
        showToast(t('toast_sync_start'));
        
        try {
            while(isLooping) {
                const res = await fetch('/api/sync', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + password },
                    body: JSON.stringify({ cursor })
                });
                
                if (!res.ok) throw new Error('Sync failed');
                
                const data = await res.json();
                total += data.migrated;
                showToast(t('toast_sync_progress', total));
                
                cursor = data.cursor;
                if (!cursor) isLooping = false;
            }
            showToast(t('toast_sync_complete', total));
            loadData(); 
        } catch (e) {
            showToast('同步失败: ' + e.message);
        } finally {
            btn.disabled = false;
        }
    }

    async function fetchNextPage() {
      if (isLoadingLibrary || !hasMoreImages) return;
      isLoadingLibrary = true;
      showBottomLoader(true);
      
      try {
        const searchTerm = document.getElementById('searchInput').value.trim();
        const sortBy = document.getElementById('sortSelect').value;
        
        const qs = new URLSearchParams({ 
            limit: '50',
            sort: sortBy
        });
        
        if (nextCursor) qs.set('cursor', nextCursor);
        if (searchTerm) qs.set('search', searchTerm);
        if (activeTag) qs.set('tag', activeTag);
        
        const res = await fetch('/api/list?' + qs.toString(), {
          headers: { 'Authorization': 'Bearer ' + password }
        });
        
        if (!res.ok) throw new Error('Failed to fetch list');
        
        const data = await res.json();
        
        if (data.images.length === 0) {
            hasMoreImages = false;
            if (currentLibrary.length === 0) {
                 document.getElementById('gallery').innerHTML = '<div class="no-images">' + t('no_images_found') + '</div>';
            } else {
                 document.getElementById('endMessage').classList.remove('hidden');
            }
        } else {
            currentLibrary.push(...data.images);
            renderAppendedBatch(data.images);
            
            nextCursor = data.nextCursor;
            if (!nextCursor) {
                hasMoreImages = false;
                document.getElementById('endMessage').classList.remove('hidden');
            }
        }

      } catch (e) {
        console.error(e);
        showToast(t('toast_error_load'));
      } finally {
        isLoadingLibrary = false;
        showBottomLoader(false);
      }
    }

    function renderAppendedBatch(items) {
      const gallery = document.getElementById('gallery');
      if (items.length === 0) return;
      
      if(gallery.querySelector('.no-images')) gallery.innerHTML = '';

      const fragment = document.createDocumentFragment();
      
      items.forEach(function(img) {
        const card = document.createElement('div');
        card.className = 'image-card' + (selectedImages.has(img.key) ? ' selected' : '');
        card.setAttribute('data-key', img.key);
        
        const displayName = img.customName || img.originalName;
        const safeName = displayName.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        const safeKey = img.key.replace(/"/g, '&quot;');
        
        let tagsHtml = '';
        if (img.tags) {
            tagsHtml = img.tags.split(',').map(function(tag) { return '<span class="image-tag">' + tag.trim() + '</span>'; }).join('');
        }
        
        const parts = [];
        
        if (selectMode) {
            const checked = selectedImages.has(img.key) ? 'checked' : '';
            parts.push('<input type="checkbox" class="checkbox js-select" ' + checked + ' data-key="' + safeKey + '">');
        }
        
        parts.push('<img src="' + img.url + '" alt="' + safeName + '" loading="lazy" class="js-lightbox" data-key="' + safeKey + '">');
        
        parts.push('<div class="image-info">');
        parts.push('<div class="image-name" title="' + safeName + '">' + displayName + '</div>');
        parts.push('<div class="image-meta">' + formatSize(img.size) + ' • ' + new Date(img.uploadTime).toLocaleDateString() + '</div>');
        
        if (tagsHtml) {
            parts.push('<div class="image-tags">' + tagsHtml + '</div>');
        }
        
        parts.push('<div class="image-actions">');
        parts.push('<div class="copy-dropdown">');
        parts.push('<button class="js-copy-menu">' + t('copy') + ' ▾</button>');
        parts.push('<div class="copy-dropdown-menu">');
        parts.push('<button class="js-copy" data-key="' + safeKey + '" data-format="url">URL</button>');
        parts.push('<button class="js-copy" data-key="' + safeKey + '" data-format="html">HTML</button>');
        parts.push('<button class="js-copy" data-key="' + safeKey + '" data-format="md">Markdown</button>');
        parts.push('</div></div>');
        
        parts.push('<button class="js-edit" data-key="' + safeKey + '">' + t('edit') + '</button>');
        parts.push('<button class="btn-danger js-delete" data-key="' + safeKey + '">' + t('del') + '</button>');
        
        parts.push('</div></div>'); 
        
        card.innerHTML = parts.join('');
        fragment.appendChild(card);
      });
      
      gallery.appendChild(fragment);
    }

    window.addEventListener('scroll', () => {
      const scrollBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      if (scrollBottom < SCROLL_THRESHOLD) {
        fetchNextPage();
      }
    });

    function handleCopy(key, type) {
       const img = currentLibrary.find(i => i.key === key);
       if(img) {
         const url = img.url || location.origin + '/img/' + img.key;
         const alt = img.customName || img.originalName;
         copyInFormat(url, alt, type);
       }
       document.querySelectorAll('.copy-dropdown.open').forEach(el => el.classList.remove('open'));
    }

    async function loadStats() {
      try {
        const res = await fetch('/api/stats', { headers: { 'Authorization': 'Bearer ' + password } });
        if (res.ok) {
          const data = await res.json();
          document.getElementById('totalImages').textContent = data.totalImages;
          document.getElementById('totalSize').textContent = data.totalSizeMB + ' MB';
        }
      } catch (e) {}
    }
     
    async function loadTags() {
       const res = await fetch('/api/tags', {
          headers: { 'Authorization': 'Bearer ' + password }
       });
       if(res.ok) {
           const data = await res.json();
           allTags = data.tags;
           renderTagCloud();
       }
    }

    function renderTagCloud() {
      const container = document.getElementById('tagCloudContent');
      if (!allTags || allTags.length === 0) {
        container.innerHTML = '<div style="color: #9ca3af; text-align: center; padding: 16px 0;">' + t('tag_no_tags') + '</div>';
        return;
      }
      container.innerHTML = allTags.map(function(item) {
        var safeTag = item.tag.replace(/"/g, '&quot;');
        return '<div class="tag-item js-tag' + (activeTag === item.tag ? ' active' : '') + '" data-tag="' + safeTag + '">' + item.tag + '<span class="tag-count">' + item.count + '</span></div>';
      }).join('');
    }

    function filterByTag(tag) {
      if (activeTag === tag) { activeTag = null; } else { activeTag = tag; }
      renderTagCloud();
      resetAndLoad();
    }

    async function uploadFiles(files) {
      const customName = document.getElementById('uploadCustomName').value.trim();
      const tags = document.getElementById('uploadTags').value.trim();
      const uploadButton = document.querySelector('#uploadArea button');
      const uploadProgress = document.getElementById('uploadProgress');
      
      uploadButton.disabled = true; 
      let successCount = 0;
      
      try {
        for (var i = 0; i < files.length; i++) {
          const file = files[i];
          uploadProgress.textContent = t('toast_uploading', i + 1, files.length);
          const formData = new FormData();
          formData.append('file', file);
          if (customName) formData.append('customName', files.length > 1 ? customName + '_' + (i + 1) : customName);
          if (tags) formData.append('tags', tags);

          const res = await fetch('/api/upload', {
             method: 'POST', headers: { 'Authorization': 'Bearer ' + password }, body: formData
          });
          const data = await res.json();
          
          if (data.success) {
             successCount++;
             const newImage = {
                 key: data.filename,
                 url: data.url,
                 size: data.size,
                 uploadTime: new Date().toISOString(),
                 originalName: file.name,
                 customName: data.customName,
                 tags: data.tags,
             };
             if (!activeTag && !document.getElementById('searchInput').value) {
                 currentLibrary.unshift(newImage);
                 renderAppendedBatch([newImage]);
                 const gallery = document.getElementById('gallery');
                 if(gallery.lastElementChild) gallery.prepend(gallery.lastElementChild);
             }
          }
        }
      } catch(e) { console.error(e); }
      finally {
          uploadButton.disabled = false;
          uploadProgress.textContent = '';
          document.getElementById('uploadCustomName').value = '';
          document.getElementById('uploadTags').value = '';
          document.getElementById('fileInput').value = '';
      }
      
      if (successCount > 0) {
          showToast(t('toast_uploaded', successCount));
          loadTags();
          loadStats();
          if(successCount > 1) resetAndLoad();
      }
    }

    async function deleteImage(key) {
      if (!confirm(t('confirm_del'))) return;
      try {
        const res = await fetch('/api/delete/' + key, {
          method: 'DELETE', headers: { 'Authorization': 'Bearer ' + password }
        });
        if (res.ok) {
          currentLibrary = currentLibrary.filter(i => i.key !== key);
          selectedImages.delete(key);
          showToast(t('toast_deleted'));
          
          document.getElementById('gallery').innerHTML = '';
          renderAppendedBatch(currentLibrary);
          
          loadTags();
          loadStats();
        }
      } catch (e) { showToast('删除失败: ' + e.message); }
    }
     
    function updateSelectionCount() {
        document.getElementById('selectedCount').textContent = t('msg_selected', selectedImages.size);
    }

    async function batchDelete() {
        if (!selectMode || selectedImages.size === 0) return showToast(t('toast_no_select'));
        if (!confirm(t('confirm_batch', selectedImages.size))) return;
        
        const keys = Array.from(selectedImages);
        try {
            const res = await fetch('/api/batch-delete', {
                method: 'POST',
                headers: {'Authorization': 'Bearer ' + password, 'Content-Type': 'application/json'},
                body: JSON.stringify({ filenames: keys })
            });
            if(res.ok) {
                const delSet = new Set(keys);
                currentLibrary = currentLibrary.filter(i => !delSet.has(i.key));
                selectedImages.clear();
                updateSelectionCount();
                showToast(t('toast_batch_success'));
                
                document.getElementById('gallery').innerHTML = '';
                renderAppendedBatch(currentLibrary);
                
                loadTags();
                loadStats();
            }
        } catch(e) { showToast(t('toast_batch_fail')); }
    }

    async function saveEdit() {
      const customName = document.getElementById('editCustomName').value.trim();
      const tags = document.getElementById('editTags').value.trim();
      try {
        const res = await fetch('/api/rename', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + password, 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: currentEditKey, customName, tags })
        });
        if (res.ok) {
           const item = currentLibrary.find(i => i.key === currentEditKey);
           if (item) {
               item.customName = customName;
               item.tags = tags;
           }
           closeEditModal();
           showToast(t('toast_saved'));
           
           document.getElementById('gallery').innerHTML = '';
           renderAppendedBatch(currentLibrary);
           
           loadTags();
        }
      } catch(e) { showToast('保存失败: ' + e.message); }
    }

    function showBottomLoader(show) {
      const el = document.getElementById('infiniteLoader');
      if (show) el.classList.remove('hidden'); else el.classList.add('hidden');
    }
     
    function toggleSelectMode() {
      selectMode = !selectMode;
      if (!selectMode) {
        selectedImages.clear();
        document.getElementById('bulkActions').classList.remove('show');
        updateSelectionCount();
      } else {
        document.getElementById('bulkActions').classList.add('show');
      }
      document.getElementById('gallery').innerHTML = '';
      renderAppendedBatch(currentLibrary);
    }

    function toggleSelect(key) {
      if (selectedImages.has(key)) selectedImages.delete(key); else selectedImages.add(key);
      updateSelectionCount();
    }
     
    function selectAll() {
      currentLibrary.forEach(function(img) { selectedImages.add(img.key); });
      updateSelectionCount();
      const gallery = document.getElementById('gallery');
      Array.from(gallery.querySelectorAll('.image-card')).forEach(function(card) { card.classList.add('selected'); });
      Array.from(gallery.querySelectorAll('.checkbox')).forEach(function(cb) { cb.checked = true; });
    }
     
    function deselectAll() {
      selectedImages.clear();
      updateSelectionCount();
      const gallery = document.getElementById('gallery');
      Array.from(gallery.querySelectorAll('.image-card')).forEach(function(card) { card.classList.remove('selected'); });
      Array.from(gallery.querySelectorAll('.checkbox')).forEach(function(cb) { cb.checked = false; });
    }

    function openEdit(key) {
      const img = currentLibrary.find(i => i.key === key);
      if (!img) return;
      currentEditKey = key;
      document.getElementById('editCustomName').value = img.customName || '';
      document.getElementById('editTags').value = img.tags || '';
      document.getElementById('editOriginalName').value = img.originalName;
      document.getElementById('editModal').classList.add('show');
    }
    function closeEditModal() { document.getElementById('editModal').classList.remove('show'); }
     
    function openLightbox(key) {
      lightboxIndex = currentLibrary.findIndex(i => i.key === key);
      if (lightboxIndex < 0) return;
      updateLightbox();
      document.getElementById('lightbox').classList.add('show');
    }
    function updateLightbox() {
      const img = currentLibrary[lightboxIndex];
      if (!img) return;
      const el = document.getElementById('lightboxImg');
      el.src = img.url || location.origin + '/img/' + img.key;
      el.alt = img.customName || img.originalName;
    }
    function prevImage(e) { e && e.stopPropagation(); if (lightboxIndex > 0) { lightboxIndex--; updateLightbox(); } }
    function nextImage(e) { e && e.stopPropagation(); if (lightboxIndex < currentLibrary.length - 1) { lightboxIndex++; updateLightbox(); } }
    function closeLightbox() { document.getElementById('lightbox').classList.remove('show'); }

    function toggleTagCloud() {
      tagCloudExpanded = !tagCloudExpanded;
      const content = document.getElementById('tagCloudContent');
      const btn = document.querySelector('.tag-cloud-toggle');
      if (tagCloudExpanded) { content.classList.add('expanded'); btn.textContent = t('collapse'); } 
      else { content.classList.remove('expanded'); btn.textContent = t('expand'); }
    }
     
    function showToast(msg) {
      const t = document.createElement('div'); t.className='toast'; t.textContent=msg;
      document.body.appendChild(t); setTimeout(function(){t.remove();}, 2500);
    }
     
    function toggleCopyMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      const wrap = e.target.closest('.copy-dropdown');
      if (!wrap) return;
      document.querySelectorAll('.copy-dropdown.open').forEach(function(el) { if (el !== wrap) el.classList.remove('open'); });
      wrap.classList.toggle('open');
    }
     
    async function attemptCopy(text) {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return; }
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position='fixed'; ta.style.left='-9999px';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
     
    function buildCopyText(url, alt, fmt) {
      switch (fmt) {
        case 'url': return url;
        case 'html': return '<img src="' + url + '" alt="' + alt + '">';
        case 'md': return '![' + alt + '](' + url + ')';
        default: return url;
      }
    }
    async function copyInFormat(url, alt, fmt) {
      try { await attemptCopy(buildCopyText(url, alt, fmt)); showToast(t('toast_copy_ok')); }
      catch (e) { showToast(t('toast_copy_fail')); }
    }
     
    function formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.copy-dropdown')) {
        document.querySelectorAll('.copy-dropdown.open').forEach(function(el) {
          el.classList.remove('open');
        });
      }
      
      var target = e.target;
      
      if (target.classList.contains('js-select')) {
        var key = target.getAttribute('data-key');
        toggleSelect(key);
        var card = target.closest('.image-card');
        if (card) {
          if (target.checked) card.classList.add('selected');
          else card.classList.remove('selected');
        }
        return;
      }
      
      if (target.classList.contains('js-lightbox')) {
        var key = target.getAttribute('data-key');
        openLightbox(key);
        return;
      }
      
      if (target.classList.contains('js-copy-menu')) {
        toggleCopyMenu(e);
        return;
      }
      
      if (target.classList.contains('js-copy')) {
        var key = target.getAttribute('data-key');
        var format = target.getAttribute('data-format');
        handleCopy(key, format);
        return;
      }
      
      if (target.classList.contains('js-edit')) {
        var key = target.getAttribute('data-key');
        openEdit(key);
        return;
      }
      
      if (target.classList.contains('js-delete')) {
        var key = target.getAttribute('data-key');
        deleteImage(key);
        return;
      }
      
      if (target.classList.contains('js-tag')) {
        var tag = target.getAttribute('data-tag');
        filterByTag(tag);
        return;
      }
    });

    document.addEventListener('dragover', function(e) {
      e.preventDefault();
      document.getElementById('uploadArea').classList.add('dragging');
    });

    document.addEventListener('dragleave', function(e) {
      if (e.target.id === 'uploadArea') {
        document.getElementById('uploadArea').classList.remove('dragging');
      }
    });

    document.addEventListener('drop', function(e) {
      e.preventDefault();
      document.getElementById('uploadArea').classList.remove('dragging');
      if (!password) return showToast(t('toast_login_first'));
      const files = e.dataTransfer.files;
      if (files.length > 0) uploadFiles(files);
    });

    document.getElementById('uploadArea').addEventListener('click', function() {
      if (!password) return showToast(t('toast_login_first'));
      document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', function(e) {
      if (this.files.length > 0) uploadFiles(this.files);
    });

    init();
  </script>
</body>
</html>`;
}

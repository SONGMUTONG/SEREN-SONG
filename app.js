/**
 * Seren 登录/注册界面
 * 基于 Untitled UI 设计规范
 */

// Tab 切换
document.querySelectorAll('.auth-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const targetTab = tab.dataset.tab;

    // 更新 tab 状态
    document.querySelectorAll('.auth-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // 切换表单显示
    document.getElementById('login-form').classList.toggle('hidden', targetTab !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', targetTab !== 'register');
  });
});

// 表单验证辅助函数
function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  if (input && errorEl) {
    input.classList.add('error');
    errorEl.textContent = message;
  }
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  if (input && errorEl) {
    input.classList.remove('error');
    errorEl.textContent = '';
  }
}

// 登录表单
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  let isValid = true;

  // 清除之前的错误
  clearError('login-email', 'login-email-error');
  clearError('login-password', 'login-password-error');

  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('login-email', 'login-email-error', '请输入邮箱地址');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('login-email', 'login-email-error', '请输入有效的邮箱地址');
    isValid = false;
  }

  // 密码验证
  if (!password) {
    showError('login-password', 'login-password-error', '请输入密码');
    isValid = false;
  }

  if (isValid) {
    console.log('登录提交:', { email, password });
    alert('登录功能需连接后端 API，当前为演示模式。');
  }
});

// 注册表单
document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const terms = document.querySelector('input[name="terms"]').checked;

  let isValid = true;

  // 清除之前的错误
  clearError('register-name', 'register-name-error');
  clearError('register-email', 'register-email-error');
  clearError('register-password', 'register-password-error');

  // 姓名验证
  if (!name) {
    showError('register-name', 'register-name-error', '请输入你的姓名');
    isValid = false;
  }

  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('register-email', 'register-email-error', '请输入邮箱地址');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('register-email', 'register-email-error', '请输入有效的邮箱地址');
    isValid = false;
  }

  // 密码验证
  if (!password) {
    showError('register-password', 'register-password-error', '请输入密码');
    isValid = false;
  } else if (password.length < 8) {
    showError('register-password', 'register-password-error', '密码至少需要 8 位字符');
    isValid = false;
  }

  // 条款勾选
  if (!terms) {
    isValid = false;
    const termsCheckbox = document.querySelector('input[name="terms"]');
    termsCheckbox.focus();
    // 可以添加视觉提示
  }

  if (isValid) {
    console.log('注册提交:', { name, email, password });
    alert('注册功能需连接后端 API，当前为演示模式。');
  }
});

// 输入时清除错误状态
const errorIdMap = {
  'login-email': 'login-email-error',
  'login-password': 'login-password-error',
  'register-name': 'register-name-error',
  'register-email': 'register-email-error',
  'register-password': 'register-password-error'
};

['login-email', 'login-password', 'register-name', 'register-email', 'register-password'].forEach(id => {
  const input = document.getElementById(id);
  if (input && errorIdMap[id]) {
    input.addEventListener('input', () => clearError(id, errorIdMap[id]));
  }
});

// Google 登录按钮（演示）
document.querySelector('.btn-google')?.addEventListener('click', () => {
  alert('Google 登录需配置 OAuth，当前为演示模式。');
});

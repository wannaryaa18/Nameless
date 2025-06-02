// Global variables
let posts = [];
let currentFilter = 'all';
let selectedTag = '';
let postIdCounter = 1;
let currentLang = 'id';
let isUserPremium = false; // Set ke true untuk menguji fitur premium yang tidak terkunci

// DOM elements
const loginPage = document.getElementById('loginPage');
const mainAppWrapper = document.getElementById('mainAppWrapper');
const loginForm = document.getElementById('loginForm');
const guestBtn = document.getElementById('guestBtn');
const postContent = document.getElementById('postContent');
const submitPost = document.getElementById('submitPost');
const feed = document.getElementById('feed');
const loginLogo = document.getElementById('loginLogo');
const mainAppLogo = document.getElementById('mainAppLogo');
const searchInput = document.getElementById('searchInput');
const navItems = document.querySelectorAll('.sidebar-left .nav-item');
const mainFeedContainer = document.getElementById('mainFeedContainer');
const pageContentContainer = document.getElementById('pageContentContainer');
const emptyStateTitle = document.getElementById('emptyStateTitle');
const emptyStateText = document.getElementById('emptyStateText');

const mainMenuBtn = document.getElementById('mainMenuBtn');
const mainMenuDropdown = document.getElementById('mainMenuDropdown');

const navHome = document.getElementById('navHome');
const navExplore = document.getElementById('navExplore');
const navStats = document.getElementById('navStats');
const navExplorePremium = document.getElementById('navExplorePremium');
const navResources = document.getElementById('navResources');
const navGuidelines = document.getElementById('navGuidelines');
const navAbout = document.getElementById('navAbout');
const navSettings = document.getElementById('navSettings');
const communityGuidelinesLink = document.getElementById('communityGuidelinesLink');

const logoLightSrc = 'logo_light.png';
const logoDarkSrc = 'logo_dark.png';

const translations = {
    id: {
        darkMode: "Mode Gelap",
        lightMode: "Mode Terang",
        logout: "Keluar",
        loginTitle: "Nameless",
        loginSubtitle: "Express Yourself Freely, Anonymously", // <<< PERUBAHAN DI SINI
        postPlaceholder: "Apa yang ingin kamu bagikan hari ini? Ceritakan perasaanmu dengan bebas dan aman di sini...",
        share: "Bagikan",
        all: "Semua",
        noPosts: "Belum ada postingan",
        beFirst: "Jadilah yang pertama berbagi cerita anonim di sini!",
        noPostsFilter: "Belum ada postingan dengan filter",
        premiumLogin: "✨ Coba Fitur Premium",
        searchPlaceholder: "Cari postingan...",
        langBtnText: "ID",
        langDropdownID: "Bahasa Indonesia",
        langDropdownEN: "English",
        alertWriteSomething: "Silakan tulis sesuatu sebelum membagikan!",
        alertWriteComment: "Silakan tulis komentar sebelum mengirim!",
        navHome: "Beranda",
        navExplore: "Jelajahi Topik",
        navResources: "Sumber Bantuan",
        navGuidelines: "Panduan Komunitas",
        navAbout: "Tentang Nameless",
        sidebarPostBtn: "Bagikan Cerita",
        widgetTitleTrending: "Lagi Hangat Dibicarakan",
        widgetTitlePrompt: "Pengingat Lembut",
        supportivePromptText1: "Setiap perasaan itu valid. Kamu tidak sendirian.",
        supportivePromptText2: "Tarik napas dalam-dalam, kamu sudah melakukan yang terbaik.",
        widgetTitleSafeSpace: "Ruang Aman Kita",
        safeSpaceText1: "Mari jaga Nameless sebagai tempat yang nyaman dan mendukung untuk semua.",
        communityGuidelinesLink: "Baca Panduan Komunitas",
        commentPlaceholder: "Tulis komentar...",
        submitCommentBtn: "Kirim",
        noCommentsYet: "Belum ada komentar.",
        commentsTitle: "Komentar",
        reportButtonText: "Laporkan",
        reportConfirmText: "Apakah Anda yakin ingin melaporkan postingan ini?",
        postReportedText: "Postingan telah dilaporkan. Terima kasih atas masukan Anda.",
        formatTime: { justNow: "baru saja", minuteAgo: " menit yang lalu", minutesAgo: " menit yang lalu", hourAgo: " jam yang lalu", hoursAgo: " jam yang lalu", dayAgo: " hari yang lalu", daysAgo: " hari yang lalu" },
        mainMenu: "Menu",
        menuLanguageLabel: "🌐 Bahasa:",
        menuSettings: "⚙️ Pengaturan",
        menuDarkMode: "🌙 Mode Gelap",
        menuLightMode: "☀️ Mode Terang",
        menuLogout: "🚪 Keluar",
        menuContactCS: "💬 Hubungi CS",
        pageTitleExplore: "Jelajahi Topik Nameless",
        pageTitleResources: "Sumber Bantuan Kesehatan Mental",
        pageTitleGuidelines: "Panduan Komunitas Nameless",
        pageTitleAbout: "Tentang Aplikasi Nameless",
        pageTitleStats: "Statistik Pengguna Anda",
        pageTitleExplorePremium: "Jelajahi Fitur Premium Kami!",
        pageTitleSettings: "Pengaturan Akun & Aplikasi",
        pageTitleContactCS: "Hubungi Customer Support Nameless",
        exploreContent: `<p>Selamat datang di halaman <strong>Jelajahi Topik</strong> Nameless!</p><p>Di sini, Anda dapat menemukan berbagai kategori diskusi yang relevan dengan kesehatan mental, pengembangan diri, dan berbagi pengalaman secara anonim. Kami terus berupaya memperkaya topik-topik yang menarik dan bermanfaat bagi komunitas.</p><h4>Temukan Inspirasi dan Dukungan:</h4><ul><li><strong>Topik Populer:</strong> Lihat apa yang sedang hangat dibicarakan oleh pengguna lain dan temukan perspektif baru.</li><li><strong>Kategori Terstruktur:</strong> Navigasi diskusi berdasarkan minat spesifik Anda, seperti 'Mengatasi Kecemasan', 'Membangun Hubungan Sehat', 'Motivasi Harian', 'Perjalanan Penyembuhan', dan banyak lagi.</li><li><strong>Filter Lanjutan:</strong> Saring postingan berdasarkan tag yang paling relevan dengan Anda, popularitas, atau waktu posting.</li></ul><p>Kami berkomitmen untuk menjadikan Nameless tempat yang kaya akan wawasan dan dukungan. Jelajahi, bagikan, dan temukan koneksi yang berarti.</p>`,
        resourcesContent: `<p>Halaman <strong>Sumber Bantuan</strong> ini didedikasikan untuk menyediakan informasi dan kontak yang mungkin berguna bagi Anda dalam perjalanan kesehatan mental Anda.</p><p><strong>Penting:</strong> Nameless adalah platform untuk berbagi dan dukungan komunitas, bukan pengganti bantuan profesional. Jika Anda atau seseorang yang Anda kenal mengalami krisis atau membutuhkan bantuan segera, harap hubungi layanan darurat lokal atau profesional kesehatan mental yang terkualifikasi.</p><h4>Direktori Sumber Daya (Nasional & Internasional):</h4><ul><li><strong>Layanan Konseling Profesional Online:</strong> Platform seperti BetterHelp, Talkspace, atau layanan lokal terverifikasi di negara Anda dapat menghubungkan Anda dengan psikolog berlisensi.</li><li><strong>Hotline Kesehatan Mental Nasional Indonesia:</strong> Layanan Sejiwa (119 ekstensi 8) siap memberikan dukungan emosional awal. Untuk negara lain, carilah hotline resmi yang tersedia.</li><li><strong>Organisasi Kesehatan Dunia (WHO):</strong> Menyediakan informasi global dan panduan mengenai kesehatan mental.</li><li><strong>Asosiasi Psikologi Lokal:</strong> HIMPSI (Himpunan Psikologi Indonesia) atau asosiasi serupa di negara Anda dapat menjadi sumber informasi kredibel.</li><li><strong>Komunitas Dukungan Spesifik:</strong> Banyak organisasi yang fokus pada isu spesifik seperti depresi (misalnya, Depression and Bipolar Support Alliance - DBSA), kecemasan (misalnya, Anxiety & Depression Association of America - ADAA), atau dukungan untuk penyintas trauma.</li></ul><p>Kami terus berupaya memperbarui dan memverifikasi direktori sumber daya ini. Jika Anda mengetahui sumber daya lain yang bermanfaat dan kredibel, silakan informasikan kepada kami melalui halaman "Hubungi CS".</p>`,
        guidelinesContent: `<p>Selamat datang di <strong>Panduan Komunitas Nameless</strong>. Untuk menjaga platform ini tetap menjadi ruang yang aman, positif, dan mendukung bagi semua pengguna, kami meminta Anda untuk membaca dan mematuhi panduan berikut dengan saksama. Pelanggaran terhadap panduan ini dapat mengakibatkan penghapusan konten atau penangguhan akun.</p><ol><li><strong>Hormati Sesama Pengguna:</strong><ul><li>Perlakukan semua orang dengan hormat, kebaikan, dan empati. Sampaikan perbedaan pendapat secara konstruktif.</li><li>Perundungan (bullying), pelecehan, intimidasi, ujaran kebencian (hate speech) dalam bentuk apapun tidak akan ditoleransi.</li><li>Jangan mengirim pesan yang mengancam, menghina, atau merendahkan pengguna lain.</li></ul></li><li><strong>Jaga Anonimitas dan Privasi:</strong><ul><li>Nameless adalah platform anonim. Jangan mencoba mengungkap, meminta, atau membagikan informasi identitas pribadi (PII) diri Anda maupun pengguna lain.</li><li>Hormati privasi orang lain. Jangan membagikan konten atau percakapan pribadi tanpa izin.</li></ul></li><li><strong>Konten yang Sesuai dan Bertanggung Jawab:</strong><ul><li>Dilarang keras memposting konten ilegal, pornografi, kekerasan eksplisit, atau konten yang mempromosikan/mengglorifikasi tindakan menyakiti diri sendiri atau orang lain.</li><li>Hindari spamming, flooding, atau promosi komersial yang tidak relevan.</li><li>Gunakan peringatan konten (Content Warning/Trigger Warning) jika berbagi tentang topik yang berpotensi sensitif atau mengganggu.</li><li>Jangan menyebarkan misinformasi atau disinformasi, terutama terkait isu kesehatan.</li></ul></li><li><strong>Berkontribusi Secara Positif:</strong><ul><li>Bagikan cerita, pengalaman, dan perasaan Anda dengan jujur dan bertanggung jawab.</li><li>Berikan dukungan yang membangun dan tidak menghakimi.</li><li>Gunakan fitur laporan untuk menandai konten atau perilaku yang melanggar panduan.</li></ul></li><li><strong>Batasan Platform:</strong><ul><li>Nameless adalah platform dukungan sebaya, bukan pengganti bantuan profesional. Jika Anda dalam krisis, segera hubungi ahli atau layanan darurat.</li><li>Moderator berhak mengambil tindakan yang diperlukan untuk menegakkan panduan ini.</li></ul></li></ol><p>Mari bersama-sama menciptakan lingkungan yang aman dan suportif di Nameless. Terima kasih!</p>`,
        aboutContent: `<p><strong>Tentang Nameless: Ruang Aman Anda untuk Berbagi Perasaan</strong></p><p>Nameless adalah platform anonim yang didedikasikan untuk kesehatan mental dan dukungan emosional. Kami percaya bahwa setiap individu berhak memiliki tempat yang aman untuk mengekspresikan diri, berbagi pengalaman, dan menemukan koneksi tanpa rasa takut akan penghakiman.</p><h4>Misi Kami</h4><p>Misi utama Nameless adalah untuk <strong>menciptakan dan memelihara komunitas global yang suportif, empatik, dan memberdayakan</strong>. Kami berupaya untuk:</p><ul><li>Menyediakan platform yang aman, anonim, dan mudah diakses bagi siapa saja untuk berbagi perjalanan emosional mereka.</li><li>Mendorong interaksi yang positif dan konstruktif yang dapat membantu mengurangi perasaan terisolasi.</li><li>Meningkatkan kesadaran dan pemahaman mengenai berbagai aspek kesehatan mental.</li><li>Menyediakan informasi mengenai sumber bantuan profesional bagi mereka yang membutuhkannya.</li></ul><h4>Nilai-Nilai Inti Kami</h4><ul><li><strong>Anonimitas & Privasi:</strong> Perlindungan identitas pengguna adalah prioritas tertinggi kami.</li><li><strong>Empati & Dukungan:</strong> Kami mendorong budaya saling mendengarkan dan memberikan dukungan yang tulus.</li><li><strong>Keamanan & Kepercayaan:</strong> Kami berkomitmen menjaga platform bebas dari konten berbahaya dan perilaku negatif.</li><li><strong>Inklusivitas:</strong> Nameless adalah ruang untuk semua orang, tanpa memandang latar belakang.</li></ul><h4>Teknologi & Tim</h4><p>Nameless dikembangkan menggunakan teknologi terkini untuk memastikan pengalaman pengguna yang lancar dan aman. Tim kami terdiri dari individu-individu yang bersemangat tentang kesehatan mental dan pembangunan komunitas. Kami bekerja sama dengan para ahli untuk memastikan platform kami mengikuti praktik terbaik dalam dukungan emosional dan keamanan data.</p><p>Kami terus berinovasi dan menambahkan fitur baru berdasarkan masukan dari komunitas. Tujuan kami adalah menjadikan Nameless sebagai sumber daya yang berharga dan tepercaya bagi siapa saja yang mencari ruang untuk berbagi dan didengarkan.</p><p>Terima kasih telah menjadi bagian dari perjalanan Nameless. Kontribusi Anda membuat perbedaan.</p>`,
        statsContent: `
                <p>Halaman <strong>Statistik Pengguna</strong> Anda menyajikan analisis mendalam mengenai aktivitas dan interaksi Anda di Nameless. Data ini diperbarui secara berkala untuk memberikan Anda wawasan terbaru. (Fitur Eksklusif Pengguna Premium)</p>
                
                <div class="stats-section">
                    <h4>Ringkasan Aktivitas Umum</h4>
                    <ul class="stats-list">
                        <li><span>Total Postingan Dibuat:</span> <strong class="stats-value">138</strong></li>
                        <li><span>Total Komentar Diberikan:</span> <strong class="stats-value">412</strong></li>
                        <li><span>Rata-rata Postingan per Minggu:</span> <strong class="stats-value">4.2</strong></li>
                        <li><span>Bergabung Sejak:</span> <strong class="stats-value">15 Februari 2024</strong></li>
                        <li><span>Hari Paling Aktif Berbagi:</span> <strong class="stats-value">Sabtu</strong></li>
                    </ul>
                </div>

                <div class="stats-section">
                    <h4>Analisis Sentimen Postingan Anda</h4>
                    <p><em>Berdasarkan analisis teks postingan Anda, berikut adalah distribusi sentimen umum:</em></p>
                    <div class="sentiment-chart-placeholder" style="border:1px solid var(--border-light); padding:15px; margin-top:10px; text-align:center; background-color:var(--hover-bg-light);">
                        <p style="margin:5px 0;"><strong>Sentimen Positif:</strong> 45% (62 postingan)</p>
                        <div style="background-color: var(--color-green); height: 20px; width: 45%; margin: 2px 0; border-radius: 3px;"></div>
                        <p style="margin:5px 0;"><strong>Sentimen Negatif:</strong> 30% (41 postingan)</p>
                        <div style="background-color: var(--color-red); height: 20px; width: 30%; margin: 2px 0; border-radius: 3px;"></div>
                        <p style="margin:5px 0;"><strong>Sentimen Netral:</strong> 25% (35 postingan)</p>
                        <div style="background-color: #ccc; height: 20px; width: 25%; margin: 2px 0; border-radius: 3px;"></div>
                        <small>Analisis ini bertujuan untuk refleksi dan dapat membantu Anda memahami tema emosional dalam tulisan Anda.</small>
                    </div>
                </div>

                <div class="stats-section">
                    <h4>Tag Paling Sering Anda Gunakan</h4>
                    <ol class="ranked-list">
                        <li>#curhat_dalam (65 kali)</li>
                        <li>#refleksi_diri (42 kali)</li>
                        <li>#dukungan_mental (38 kali)</li>
                        <li>#tantangan_hidup (25 kali)</li>
                        <li>#harapan_baru (18 kali)</li>
                    </ol>
                </div>

                <div class="stats-section">
                    <h4>Interaksi pada Postingan Anda</h4>
                    <ul class="stats-list">
                        <li><span>Total Reaksi ❤️ (Suka) Diterima:</span> <strong class="stats-value">1.205</strong></li>
                        <li><span>Total Reaksi 🤗 (Pelukan) Diterima:</span> <strong class="stats-value">1.530</strong></li>
                        <li><span>Rata-rata Reaksi per Postingan:</span> <strong class="stats-value">19.8</strong></li>
                        <li><span>Postingan Paling Banyak Interaksi:</span> <strong class="stats-value">"Mengatasi Rasa Kesepian di Tengah Keramaian"</strong> (ID: P078)</li>
                    </ul>
                </div>
                
                <p style="margin-top:25px; font-size:0.9em; text-align:center;"><em>Statistik ini dirancang untuk membantu Anda memahami lebih dalam perjalanan Anda di Nameless.</em></p>`,
        explorePremiumContent: `<h2>Unlock Pengalaman Terbaik dengan Nameless Premium!</h2><p>Dapatkan akses ke fitur-fitur eksklusif yang dirancang untuk memperkaya perjalanan Anda dalam berbagi dan mendapatkan dukungan di Nameless.</p><h3>Manfaat Utama Berlangganan Premium:</h3><ul><li><strong>📊 Analitik Postingan Pribadi Mendalam:</strong> Akses halaman statistik lengkap untuk memahami pola berbagi, sentimen, dan interaksi Anda secara detail.</li><li><strong>🎨 Tema Aplikasi Eksklusif:</strong> Personalisasi tampilan aplikasi Nameless dengan beragam pilihan tema premium yang dirancang untuk kenyamanan visual Anda.</li><li><strong>👑 Badge Profil Premium:</strong> Tunjukkan dukungan Anda terhadap komunitas dan dapatkan badge khusus yang membedakan Anda.</li><li><strong>📝 Pilihan Font Lanjutan:</strong> Kustomisasi tampilan teks postingan Anda dengan pilihan font yang lebih beragam untuk ekspresi diri yang lebih personal dan unik.</li><li><strong>🤫 Mode Penyamaran Super:</strong> Fitur privasi tambahan yang memberikan lapisan keamanan ekstra saat Anda ingin berbagi hal yang sangat sensitif.</li><li><strong>🚀 Akses Lebih Awal ke Fitur Baru:</strong> Jadilah yang pertama mencoba inovasi dan fitur-fitur terbaru yang kami kembangkan khusus untuk pengguna Premium.</li><li><strong>🖼️ Unggah Gambar Berkualitas Tinggi (Rencana):</strong> Bagikan cerita Anda dengan dukungan visual yang lebih baik.</li><li><strong>🚫 Pengalaman Bebas Iklan Sepenuhnya:</strong> Nikmati Nameless tanpa gangguan iklan apapun, memungkinkan fokus penuh pada berbagi dan membaca.</li></ul><p>Dengan berlangganan Premium, Anda tidak hanya meningkatkan pengalaman pribadi Anda, tetapi juga secara langsung mendukung operasional, pemeliharaan, dan pengembangan berkelanjutan platform Nameless. Bantuan Anda memastikan kami dapat terus menyediakan ruang aman ini bagi jutaan orang yang membutuhkannya.</p><p style="margin-top: 20px; text-align:center;"><button class="premium-unlock-btn" id="upgradeToPremiumBtnPageExplore">Upgrade ke Akun Premium Sekarang!</button></p>`,
        settingsContent: `
                <div class="settings-section">
                    <h4>Preferensi Akun</h4>
                    <div class="setting-item">
                        <label for="profileUsername">Nama Pengguna (Alias):</label>
                        <input type="text" id="profileUsername" value="PenggunaAnonim734" disabled style="background:#eee; cursor:not-allowed;"> <small>Tidak dapat diubah untuk menjaga anonimitas.</small>
                    </div>
                    <div class="setting-item">
                        <label for="profileEmail">Email Terhubung:</label>
                        <input type="email" id="profileEmail" value="anda******@example.com" disabled style="background:#eee; cursor:not-allowed;">
                        <button class="setting-btn-inline" onclick="alert('Fungsi ubah email akan segera tersedia.')">Ubah Email</button>
                    </div>
                     <div class="setting-item">
                        <label for="profilePassword">Kata Sandi:</label>
                        <button class="setting-btn" onclick="alert('Fungsi ubah kata sandi akan segera tersedia.')">Ubah Kata Sandi</button>
                    </div>
                </div>

                <div class="settings-section">
                    <h4>Notifikasi</h4>
                    <div class="setting-item-toggle">
                        <span>Notifikasi Komentar Baru pada Postingan Saya:</span>
                        <label class="switch"><input type="checkbox" checked onchange="alert('Pengaturan notifikasi disimpan')"><span class="slider round"></span></label>
                    </div>
                    <div class="setting-item-toggle">
                        <span>Notifikasi Reaksi Baru pada Postingan Saya:</span>
                        <label class="switch"><input type="checkbox" checked onchange="alert('Pengaturan notifikasi disimpan')"><span class="slider round"></span></label>
                    </div>
                    <div class="setting-item-toggle">
                        <span>Notifikasi Email untuk Pengumuman Penting:</span>
                        <label class="switch"><input type="checkbox" onchange="alert('Pengaturan notifikasi disimpan')"><span class="slider round"></span></label>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h4>Preferensi Tampilan</h4>
                    <div class="setting-item-toggle">
                        <span>Mode Gelap Otomatis (Mengikuti Sistem):</span>
                        <label class="switch"><input type="checkbox" onchange="alert('Pengaturan mode gelap disimpan. Untuk perubahan manual, gunakan tombol di menu utama.')"><span class="slider round"></span></label>
                    </div>
                     <div class="setting-item">
                        <label for="fontSizeSelect">Ukuran Font Tampilan:</label>
                        <select id="fontSizeSelect" class="setting-select" onchange="alert('Ukuran font diubah ke: ' + this.value)">
                            <option value="kecil">Kecil</option>
                            <option value="normal" selected>Normal</option>
                            <option value="besar">Besar</option>
                        </select>
                    </div>
                </div>

                <div class="settings-section">
                    <h4>Privasi & Keamanan</h4>
                    <div class="setting-item">
                        <button class="setting-btn" onclick="alert('Fungsi kelola sesi aktif akan menampilkan perangkat yang terhubung.')">Kelola Sesi Aktif</button>
                    </div>
                     <div class="setting-item">
                        <button class="setting-btn" onclick="alert('Fungsi autentikasi dua faktor (2FA) akan segera tersedia untuk meningkatkan keamanan akun Anda.')">Aktifkan Autentikasi Dua Faktor (2FA)</button>
                    </div>
                </div>

                <div class="settings-section">
                    <h4>Manajemen Data</h4>
                     <div class="setting-item">
                        <button class="setting-btn" onclick="alert('Permintaan ekspor data Anda sedang diproses. Anda akan menerima email dalam beberapa jam dengan tautan unduhan.')">Ekspor Data Saya</button>
                    </div>
                    <div class="setting-item">
                        <button class="setting-btn setting-btn-danger" onclick="confirm('Apakah Anda yakin ingin menghapus akun Anda secara permanen? Tindakan ini tidak dapat diurungkan.') ? alert('Akun Anda telah dijadwalkan untuk penghapusan.') : alert('Penghapusan akun dibatalkan.');">Hapus Akun Saya</button>
                    </div>
                </div>
                <p style="font-size:0.9em; text-align:center; margin-top:20px;">Nameless versi 1.0.1</p>`,
        contactCSContent: `<p>Mengalami masalah, punya pertanyaan, atau ingin memberikan masukan tentang Nameless? Tim Customer Support kami siap membantu Anda!</p><p>Sebelum menghubungi kami, Anda mungkin ingin memeriksa halaman <a href="#" data-page-link="guidelines" class="text-link">Panduan Komunitas</a> atau <a href="#" data-page-link="about" class="text-link">Tentang Nameless</a> untuk informasi umum.</p><h4>Cara Menghubungi Kami:</h4><ul><li><strong>Email Langsung:</strong> Anda dapat mengirimkan email ke alamat dukungan kami di: <strong>support@namelessapp.dev</strong>. Usahakan untuk menyertakan detail sebanyak mungkin mengenai pertanyaan atau masalah Anda.</li><li><strong>Formulir Kontak Dalam Aplikasi:</strong> (Segera Hadir) Nantinya, Anda akan dapat mengisi formulir langsung dari sini untuk mengirimkan pertanyaan Anda.</li></ul><h4>Waktu Respons:</h4><p>Tim kami berusaha untuk merespons semua pertanyaan dan laporan dalam waktu <strong>1-2 hari kerja</strong>. Mohon kesabarannya, terutama pada periode dengan volume permintaan tinggi.</p><h4>Informasi yang Mungkin Membantu Kami:</h4><p>Jika Anda melaporkan masalah teknis, menyertakan informasi berikut dapat mempercepat proses penyelesaian:</p><ul><li>Deskripsi masalah yang detail dan jelas.</li><li>Langkah-langkah untuk mereplikasi masalah tersebut (jika ada).</li><li>Jenis perangkat (misalnya, Samsung Galaxy S22, iPhone 14 Pro) dan versi sistem operasi (misalnya, Android 13, iOS 16.5).</li><li>Versi browser (jika menggunakan versi web) atau versi aplikasi Nameless.</li><li>Screenshot atau rekaman video singkat dari masalah (jika memungkinkan dan tidak mengandung informasi sensitif).</li></ul><p>Terima kasih atas kesabaran dan kerja sama Anda. Kami berkomitmen untuk memberikan pengalaman terbaik di Nameless.</p>`,
        premiumFeatureLockTitle: "Statistik Pengguna Terkunci",
        premiumFeatureLockMessage: "Halaman Statistik Pengguna ini hanya dapat diakses oleh pengguna Premium. Upgrade akun Anda untuk mendapatkan wawasan mendalam tentang aktivitas Anda dan mendukung pengembangan Nameless!",
        becomePremium: "Upgrade ke Premium",
        navStats: "Statistik (Premium)",
        navExplorePremium: "Fitur Premium",
        navSettings: "Pengaturan",
    },
    en: {
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        logout: "Logout",
        loginTitle: "Nameless",
        loginSubtitle: "Express Yourself Freely, Anonymously", // <<< PERUBAHAN DI SINI JUGA (atau terjemahan Inggris yang sesuai)
        postPlaceholder: "What do you want to share today? Tell your feelings freely and safely here...",
        share: "Share",
        all: "All",
        noPosts: "No posts yet",
        beFirst: "Be the first to share an anonymous story here!",
        noPostsFilter: "No posts with filter",
        premiumLogin: "✨ Try Premium Features",
        searchPlaceholder: "Search posts...",
        langBtnText: "EN",
        langDropdownID: "Indonesian",
        langDropdownEN: "English",
        alertWriteSomething: "Please write something before sharing!",
        alertWriteComment: "Please write a comment before submitting!",
        navHome: "Home",
        navExplore: "Explore Topics",
        navResources: "Help Resources",
        navGuidelines: "Community Guidelines",
        navAbout: "About Nameless",
        sidebarPostBtn: "Share Story",
        widgetTitleTrending: "Trending Now",
        widgetTitlePrompt: "Gentle Reminder",
        supportivePromptText1: "Every feeling is valid. You are not alone.",
        supportivePromptText2: "Take a deep breath, you're doing your best.",
        widgetTitleSafeSpace: "Our Safe Space",
        safeSpaceText1: "Let's keep Nameless a comfortable and supportive place for everyone.",
        communityGuidelinesLink: "Read Community Guidelines",
        commentPlaceholder: "Write a comment...",
        submitCommentBtn: "Submit",
        noCommentsYet: "No comments yet.",
        commentsTitle: "Comments",
        reportButtonText: "Report",
        reportConfirmText: "Are you sure you want to report this post?",
        postReportedText: "Post has been reported. Thank you for your feedback.",
        formatTime: { justNow: "just now", minuteAgo: " minute ago", minutesAgo: " minutes ago", hourAgo: " hour ago", hoursAgo: " hours ago", dayAgo: " day ago", daysAgo: " days ago" },
        mainMenu: "Menu",
        menuLanguageLabel: "🌐 Language:",
        menuSettings: "⚙️ Settings",
        menuDarkMode: "🌙 Dark Mode",
        menuLightMode: "☀️ Light Mode",
        menuLogout: "🚪 Logout",
        menuContactCS: "💬 Contact CS",
        pageTitleExplore: "Explore Nameless Topics",
        pageTitleResources: "Mental Health Help Resources",
        pageTitleGuidelines: "Nameless Community Guidelines",
        pageTitleAbout: "About Nameless App",
        pageTitleStats: "Your User Statistics",
        pageTitleExplorePremium: "Explore Our Premium Features!",
        pageTitleSettings: "Account & App Settings",
        pageTitleContactCS: "Contact Nameless Customer Support",
        exploreContent: `<p>Welcome to the Nameless <strong>Explore Topics</strong> page!</p><p>Here, you can find various discussion categories relevant to mental health, self-development, and anonymous experience sharing. We continuously strive to enrich the topics that are engaging and beneficial for our community.</p><h4>Find Inspiration and Support:</h4><ul><li><strong>Popular Topics:</strong> See what's currently trending among other users and discover new perspectives.</li><li><strong>Structured Categories:</strong> Navigate discussions based on your specific interests, such as 'Coping with Anxiety', 'Building Healthy Relationships', 'Daily Motivation', 'Healing Journeys', and more.</li><li><strong>Advanced Filters:</strong> Sift through posts by tags most relevant to you, popularity, or posting time.</li></ul><p>We are committed to making Nameless a rich space for insight and support. Explore, share, and find meaningful connections.</p>`,
        resourcesContent: `<p>This <strong>Help Resources</strong> page is dedicated to providing information and contacts that may be useful for your mental health journey.</p><p><strong>Important:</strong> Nameless is a platform for sharing and community support, not a substitute for professional help. If you or someone you know is in crisis or needs immediate assistance, please contact local emergency services or a qualified mental health professional.</p><h4>Resource Directory (National & International):</h4><ul><li><strong>Professional Online Counseling Services:</strong> Platforms like BetterHelp, Talkspace, or verified local services in your country can connect you with licensed psychologists.</li><li><strong>National Mental Health Hotlines:</strong> Most countries have official mental health hotlines. For example, in the US, the National Suicide Prevention Lifeline is 988. Please find the official hotline for your country.</li><li><strong>World Health Organization (WHO):</strong> Provides global information and guidance on mental health.</li><li><strong>Local Psychological Associations:</strong> The American Psychological Association (APA) or similar associations in your country can be credible sources of information.</li><li><strong>Specific Support Communities:</strong> Many organizations focus on specific issues like depression (e.g., Depression and Bipolar Support Alliance - DBSA), anxiety (e.g., Anxiety & Depression Association of America - ADAA), or support for trauma survivors.</li></ul><p>We continuously work to update and verify this resource directory. If you know of other helpful and credible resources, please inform us via the "Contact CS" page.</p>`,
        guidelinesContent: `<p>Welcome to the <strong>Nameless Community Guidelines</strong>. To ensure this platform remains a safe, positive, and supportive space for all users, we ask you to read and adhere to the following guidelines carefully. Violations of these guidelines may result in content removal or account suspension.</p><ol><li><strong>Respect Fellow Users:</strong><ul><li>Treat everyone with respect, kindness, and empathy. Express differences of opinion constructively.</li><li>Bullying, harassment, intimidation, and hate speech in any form will not be tolerated.</li><li>Do not send threatening, insulting, or demeaning messages to other users.</li></ul></li><li><strong>Maintain Anonymity and Privacy:</strong><ul><li>Nameless is an anonymous platform. Do not attempt to reveal, request, or share Personally Identifiable Information (PII) of yourself or other users.</li><li>Respect others' privacy. Do not share private content or conversations without consent.</li></ul></li><li><strong>Appropriate and Responsible Content:</strong><ul><li>Posting illegal content, pornography, explicit violence, or content that promotes/glorifies self-harm or harm to others is strictly prohibited.</li><li>Avoid spamming, flooding, or irrelevant commercial promotions.</li><li>Use Content Warnings/Trigger Warnings when sharing potentially sensitive or disturbing topics.</li><li>Do not spread misinformation or disinformation, especially regarding health issues.</li></ul></li><li><strong>Contribute Positively:</strong><ul><li>Share your stories, experiences, and feelings honestly and responsibly.</li><li>Provide constructive and non-judgmental support.</li><li>Use the report feature to flag content or behavior that violates guidelines.</li></ul></li><li><strong>Platform Limitations:</strong><ul><li>Nameless is a peer support platform, not a substitute for professional help. If in crisis, contact experts or emergency services immediately.</li><li>Moderators reserve the right to take necessary actions to enforce these guidelines.</li></ul></li></ol><p>Let's together create a safe and supportive environment on Nameless. Thank you!</p>`,
        aboutContent: `<p><strong>About Nameless: Your Safe Space to Share Feelings</strong></p><p>Nameless is an anonymous platform dedicated to mental health and emotional support. We believe every individual deserves a safe place to express themselves, share experiences, and find connection without fear of judgment.</p><h4>Our Mission</h4><p>The primary mission of Nameless is to <strong>create and maintain a supportive, empathetic, and empowering global anonymous community</strong>. We strive to:</p><ul><li>Provide a safe, anonymous, and accessible platform for anyone to share their emotional journey.</li><li>Encourage positive and constructive interactions that can help reduce feelings of isolation.</li><li>Increase awareness and understanding of various aspects of mental health.</li><li>Provide information on professional help resources for those who need them.</li></ul><h4>Our Core Values</h4><ul><li><strong>Anonymity & Privacy:</strong> Protecting user identity is our highest priority.</li><li><strong>Empathy & Support:</strong> We foster a culture of listening and providing sincere support.</li><li><strong>Safety & Trust:</strong> We are committed to keeping the platform free from harmful content and negative behavior.</li><li><strong>Inclusivity:</strong> Nameless is a space for everyone, regardless of background.</li></ul><h4>Technology & Team</h4><p>Nameless is developed using modern technology to ensure a smooth and secure user experience. Our team consists of individuals passionate about mental health and community building. We collaborate with experts to ensure our platform follows best practices in emotional support and data security.</p><p>We continuously innovate and add new features based on community feedback. Our goal is to make Nameless a valuable and trusted resource for anyone seeking a space to share and be heard.</p><p>Thank you for being part of the Nameless journey. Your contribution makes a difference.</p>`,
        statsContent: `
                <p>Your <strong>User Statistics</strong> page provides an in-depth analysis of your activity and interactions on Nameless. This data is updated regularly to give you the latest insights. (Exclusive Premium User Feature)</p>
                
                <div class="stats-section">
                    <h4>General Activity Summary</h4>
                    <ul class="stats-list">
                        <li><span>Total Posts Created:</span> <strong class="stats-value">138</strong></li>
                        <li><span>Total Comments Given:</span> <strong class="stats-value">412</strong></li>
                        <li><span>Average Posts per Week:</span> <strong class="stats-value">4.2</strong></li>
                        <li><span>Joined Since:</span> <strong class="stats-value">February 15, 2024</strong></li>
                        <li><span>Most Active Sharing Day:</span> <strong class="stats-value">Saturday</strong></li>
                    </ul>
                </div>

                <div class="stats-section">
                    <h4>Sentiment Analysis of Your Posts</h4>
                    <p><em>Based on the text analysis of your posts, here's the general sentiment distribution:</em></p>
                    <div class="sentiment-chart-placeholder" style="border:1px solid var(--border-light); padding:15px; margin-top:10px; text-align:center; background-color:var(--hover-bg-light);">
                        <p style="margin:5px 0;"><strong>Positive Sentiment:</strong> 45% (62 posts)</p>
                        <div style="background-color: var(--color-green); height: 20px; width: 45%; margin: 2px 0; border-radius: 3px;"></div>
                        <p style="margin:5px 0;"><strong>Negative Sentiment:</strong> 30% (41 posts)</p>
                        <div style="background-color: var(--color-red); height: 20px; width: 30%; margin: 2px 0; border-radius: 3px;"></div>
                        <p style="margin:5px 0;"><strong>Neutral Sentiment:</strong> 25% (35 posts)</p>
                        <div style="background-color: #ccc; height: 20px; width: 25%; margin: 2px 0; border-radius: 3px;"></div>
                        <small>This analysis is for reflection and can help you understand emotional themes in your writing.</small>
                    </div>
                </div>

                <div class="stats-section">
                    <h4>Your Most Frequently Used Tags</h4>
                    <ol class="ranked-list">
                        <li>#deep_thoughts (65 times)</li>
                        <li>#self_reflection (42 times)</li>
                        <li>#mental_support (38 times)</li>
                        <li>#life_challenges (25 times)</li>
                        <li>#new_hope (18 times)</li>
                    </ol>
                </div>

                <div class="stats-section">
                    <h4>Interactions on Your Posts</h4>
                    <ul class="stats-list">
                        <li><span>Total ❤️ (Like) Reactions Received:</span> <strong class="stats-value">1,205</strong></li>
                        <li><span>Total 🤗 (Hug) Reactions Received:</span> <strong class="stats-value">1,530</strong></li>
                        <li><span>Average Reactions per Post:</span> <strong class="stats-value">19.8</strong></li>
                        <li><span>Most Interacted Post:</span> <strong class="stats-value">"Overcoming Loneliness in a Crowd"</strong> (ID: P078)</li>
                    </ul>
                </div>
                
                <p style="margin-top:25px; font-size:0.9em; text-align:center;"><em>These statistics are designed to help you better understand your journey on Nameless.</em></p>`,
        explorePremiumContent: `<h2>Unlock the Best Nameless Experience with Premium!</h2><p>Gain access to exclusive features designed to enrich your sharing and support journey on Nameless.</p><h3>Key Benefits of Subscribing to Premium:</h3><ul><li><strong>📊 In-depth Personal Post Analytics:</strong> Access a comprehensive statistics page to understand your sharing patterns, sentiments, and interactions in detail.</li><li><strong>🎨 Exclusive App Themes:</strong> Personalize the Nameless app's appearance with a variety of premium themes designed for your visual comfort.</li><li><strong>👑 Premium Profile Badge:</strong> Showcase your support for the community and receive a special badge that distinguishes you.</li><li><strong>📝 Advanced Font Choices:</strong> Customize the look of your post text with a wider selection of fonts for more personal and unique self-expression.</li><li><strong>🤫 Super Incognito Mode:</strong> An additional privacy feature that provides an extra layer of security when you want to share highly sensitive matters.</li><li><strong>🚀 Early Access to New Features:</strong> Be the first to try innovations and the latest features we develop exclusively for Premium users.</li><li><strong>🖼️ High-Quality Image Uploads (Planned):</strong> Share your stories with better visual support.</li><li><strong>🚫 Completely Ad-Free Experience:</strong> Enjoy Nameless without any ad interruptions, allowing full focus on sharing and reading.</li></ul><p>By subscribing to Premium, you not only enhance your personal experience but also directly support the operation, maintenance, and continuous development of the Nameless platform. Your help ensures we can continue to provide this safe space for millions who need it.</p><p style="margin-top: 20px; text-align:center;"><button class="premium-unlock-btn" id="upgradeToPremiumBtnPageExplore">Upgrade to Premium Account Now!</button></p>`,
        settingsContent: `
                <div class="settings-section">
                    <h4>Account Preferences</h4>
                    <div class="setting-item">
                        <label for="profileUsername">Username (Alias):</label>
                        <input type="text" id="profileUsername" value="AnonymousUser734" disabled style="background:#eee; cursor:not-allowed;"> <small>Cannot be changed to maintain anonymity.</small>
                    </div>
                    <div class="setting-item">
                        <label for="profileEmail">Connected Email:</label>
                        <input type="email" id="profileEmail" value="you******@example.com" disabled style="background:#eee; cursor:not-allowed;">
                        <button class="setting-btn-inline" onclick="alert('Change email functionality will be available soon.')">Change Email</button>
                    </div>
                     <div class="setting-item">
                        <label for="profilePassword">Password:</label>
                        <button class="setting-btn" onclick="alert('Change password functionality will be available soon.')">Change Password</button>
                    </div>
                </div>

                <div class="settings-section">
                    <h4>Notifications</h4>
                    <div class="setting-item-toggle">
                        <span>New Comments on My Posts:</span>
                        <label class="switch"><input type="checkbox" checked onchange="alert('Notification settings saved')"><span class="slider round"></span></label>
                    </div>
                    <div class="setting-item-toggle">
                        <span>New Reactions on My Posts:</span>
                        <label class="switch"><input type="checkbox" checked onchange="alert('Notification settings saved')"><span class="slider round"></span></label>
                    </div>
                    <div class="setting-item-toggle">
                        <span>Email Notifications for Important Announcements:</span>
                        <label class="switch"><input type="checkbox" onchange="alert('Notification settings saved')"><span class="slider round"></span></label>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h4>Display Preferences</h4>
                    <div class="setting-item-toggle">
                        <span>Auto Dark Mode (Follow System):</span>
                        <label class="switch"><input type="checkbox" onchange="alert('Dark mode settings saved. For manual changes, use the button in the main menu.')"><span class="slider round"></span></label>
                    </div>
                     <div class="setting-item">
                        <label for="fontSizeSelect">Display Font Size:</label>
                        <select id="fontSizeSelect" class="setting-select" onchange="alert('Font size changed to: ' + this.value)">
                            <option value="small">Small</option>
                            <option value="normal" selected>Normal</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>

                <div class="settings-section">
                    <h4>Privacy & Security</h4>
                    <div class="setting-item">
                        <button class="setting-btn" onclick="alert('Manage active sessions functionality will display connected devices.')">Manage Active Sessions</button>
                    </div>
                     <div class="setting-item">
                        <button class="setting-btn" onclick="alert('Two-factor authentication (2FA) functionality will be available soon to enhance your account security.')">Enable Two-Factor Authentication (2FA)</button>
                    </div>
                </div>

                <div class="settings-section">
                    <h4>Data Management</h4>
                     <div class="setting-item">
                        <button class="setting-btn" onclick="alert('Your data export request is being processed. You will receive an email within a few hours with a download link.')">Export My Data</button>
                    </div>
                    <div class="setting-item">
                        <button class="setting-btn setting-btn-danger" onclick="confirm('Are you sure you want to permanently delete your account? This action cannot be undone.') ? alert('Your account has been scheduled for deletion.') : alert('Account deletion cancelled.');">Delete My Account</button>
                    </div>
                </div>
                <p style="font-size:0.9em; text-align:center; margin-top:20px;">Nameless Version 1.0.1</p>`,
        contactCSContent: `<p>Experiencing issues, have questions, or want to provide feedback about Nameless? Our Customer Support team is ready to assist you!</p><p>Before contacting us, you might want to check our <a href="#" data-page-link="guidelines" class="text-link">Community Guidelines</a> or <a href="#" data-page-link="about" class="text-link">About Nameless</a> pages for general information.</p><h4>How to Reach Us:</h4><ul><li><strong>Direct Email:</strong> You can send an email to our support address at: <strong>support@namelessapp.dev</strong>. Please try to include as much detail as possible regarding your query or issue.</li><li><strong>In-App Contact Form:</strong> (Coming Soon) In the future, you will be able to fill out a form directly from here to submit your inquiries.</li></ul><h4>Response Time:</h4><p>Our team strives to respond to all inquiries and reports within <strong>1-2 business days</strong>. Please be patient, especially during periods of high request volume.</p><h4>Information That Might Help Us:</h4><p>If you are reporting a technical issue, including the following information can expedite the resolution process:</p><ul><li>A detailed and clear description of the problem.</li><li>Steps to replicate the issue (if applicable).</li><li>Device type (e.g., Samsung Galaxy S22, iPhone 14 Pro) and operating system version (e.g., Android 13, iOS 16.5).</li><li>Browser version (if using the web version) or Nameless app version.</li><li>A screenshot or short video recording of the issue (if possible and does not contain sensitive information).</li></ul><p>Thank you for your patience and cooperation. We are committed to providing the best experience on Nameless.</p>`,
        premiumFeatureLockTitle: "🔒 User Statistics Locked",
        premiumFeatureLockMessage: "This User Statistics page is only accessible to Premium users. Upgrade your account to get in-depth insights into your activity and support the development of Nameless!",
        becomePremium: "Upgrade to Premium",
        navStats: "Statistics (Premium)",
        navExplorePremium: "Premium Features",
        navSettings: "Settings",
    }
};

function updateTexts(lang) {
    const t = translations[lang];
    document.documentElement.lang = lang;

    if (document.querySelector('.login-title')) document.querySelector('.login-title').textContent = t.loginTitle;
    if (document.querySelector('.login-subtitle')) document.querySelector('.login-subtitle').textContent = t.loginSubtitle;
    if (document.getElementById('premiumLoginBtn')) document.getElementById('premiumLoginBtn').textContent = t.premiumLogin;
    if (document.querySelector('.login-form .login-btn')) document.querySelector('.login-form .login-btn').textContent = (lang === 'id' ? "Masuk" : "Login");
    if (guestBtn) guestBtn.textContent = (lang === 'id' ? "Lanjut sebagai Tamu" : "Continue as Guest");

    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    if (mainMenuBtn) mainMenuBtn.title = t.mainMenu;

    if (postContent) postContent.placeholder = t.postPlaceholder;
    if (submitPost) submitPost.textContent = t.share;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === 'all') btn.textContent = t.all;
    });

    if (navHome) navHome.querySelector('.nav-text').textContent = t.navHome;
    if (navExplore) navExplore.querySelector('.nav-text').textContent = t.navExplore;
    if (navStats) navStats.querySelector('.nav-text').textContent = t.navStats;
    if (navExplorePremium) navExplorePremium.querySelector('.nav-text').textContent = t.navExplorePremium;
    if (navResources) navResources.querySelector('.nav-text').textContent = t.navResources;
    if (navGuidelines) navGuidelines.querySelector('.nav-text').textContent = t.navGuidelines;
    if (navAbout) navAbout.querySelector('.nav-text').textContent = t.navAbout;
    if (navSettings) navSettings.querySelector('.nav-text').textContent = t.navSettings;

    const sidebarPostButton = document.getElementById('sidebarPostBtn');
    if (sidebarPostButton) {
        const textSpan = sidebarPostButton.querySelector('.nav-text');
        if (textSpan) textSpan.textContent = t.sidebarPostBtn;
    }

    if (document.getElementById('widgetTitleTrending')) document.getElementById('widgetTitleTrending').textContent = t.widgetTitleTrending;
    if (document.getElementById('widgetTitlePrompt')) document.getElementById('widgetTitlePrompt').textContent = t.widgetTitlePrompt;
    if (document.getElementById('supportivePromptText1')) document.getElementById('supportivePromptText1').textContent = t.supportivePromptText1;
    if (document.getElementById('supportivePromptText2')) document.getElementById('supportivePromptText2').textContent = t.supportivePromptText2;
    if (document.getElementById('widgetTitleSafeSpace')) document.getElementById('widgetTitleSafeSpace').textContent = t.widgetTitleSafeSpace;
    if (document.getElementById('safeSpaceText1')) document.getElementById('safeSpaceText1').textContent = t.safeSpaceText1;
    if (communityGuidelinesLink) communityGuidelinesLink.textContent = t.communityGuidelinesLink;

    if (emptyStateTitle) emptyStateTitle.textContent = t.noPosts;
    if (emptyStateText) emptyStateText.textContent = t.beFirst;

    const activeNav = document.querySelector('.sidebar-left .nav-item.active');
    if (pageContentContainer && pageContentContainer.style.display === 'block' && activeNav) {
        loadPageContent(activeNav.dataset.page, false); // false to prevent re-rendering posts if on home
    } else if (mainFeedContainer && mainFeedContainer.style.display !== 'none') {
        renderPosts(); // Re-render posts if on home page and language changes
    }
    buildMainMenu(); // Rebuild menu to reflect language changes
}


function buildMainMenu() {
    const t = translations[currentLang];
    mainMenuDropdown.innerHTML = `
        <div class="main-menu-item language-switcher-menu">
            <span id="menuLanguageLabel">${t.menuLanguageLabel}</span>
            <button id="languageToggleBtnMenu">${t.langBtnText}</button>
            <div class="language-dropdown-menu" id="languageOptionsMenu">
                <a href="#" data-lang="id">${t.langDropdownID}</a>
                <a href="#" data-lang="en">${t.langDropdownEN}</a>
            </div>
        </div>
        <a href="#" class="main-menu-item" data-page="contactCS">${t.menuContactCS}</a>
        <a href="#" class="main-menu-item" data-page="settings">${t.menuSettings}</a>
        <a href="#" class="main-menu-item" id="darkModeToggleMenuItem">${document.body.classList.contains('dark-mode') ? t.menuLightMode : t.menuDarkMode}</a>
        <a href="#" class="main-menu-item" id="logoutBtnMenuItem">${t.menuLogout}</a>
    `;

    const newLangToggleBtn = document.getElementById('languageToggleBtnMenu');
    const newLangOptions = document.getElementById('languageOptionsMenu');
    const newDarkModeToggle = document.getElementById('darkModeToggleMenuItem');
    const newLogoutBtn = document.getElementById('logoutBtnMenuItem');

    if (newLangToggleBtn && newLangOptions) {
        newLangToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            newLangOptions.style.display = newLangOptions.style.display === 'block' ? 'none' : 'block';
        });
        newLangOptions.addEventListener('click', function(e) {
            e.stopPropagation();
            const langLink = e.target.closest('a[data-lang]');
            if (langLink) {
                e.preventDefault();
                const lang = langLink.dataset.lang;
                if (lang && lang !== currentLang) {
                    currentLang = lang;
                    localStorage.setItem('appLanguage', lang);
                    updateTexts(lang); // This will also call buildMainMenu
                }
                newLangOptions.style.display = 'none';
            }
        });
    }
    if (newDarkModeToggle) {
        newDarkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            updateDarkModeUI(); // This will call updateTexts which calls buildMainMenu
            mainMenuDropdown.classList.remove('show');
        });
    }
    if (newLogoutBtn) {
        newLogoutBtn.addEventListener('click', function() {
            showLoginPage();
            mainMenuDropdown.classList.remove('show');
        });
    }

    mainMenuDropdown.querySelectorAll('a[data-page]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            loadPageContent(page);
            navItems.forEach(nav => nav.classList.remove('active'));
            const correspondingSidebarItem = document.querySelector(`.sidebar-nav .nav-item[data-page="${page}"]`);
            if (correspondingSidebarItem) {
                correspondingSidebarItem.classList.add('active');
            }
            mainMenuDropdown.classList.remove('show');
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('appLanguage') || 'id';
    currentLang = savedLang;

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const darkBg = rootStyle.getPropertyValue('--bg-dark').trim();
    const lightBg = rootStyle.getPropertyValue('--bg-light').trim();
    const redColor = rootStyle.getPropertyValue('--color-red').trim();

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    }
    if (darkBg) document.documentElement.style.setProperty('--bg-dark-rgb', hexToRgb(darkBg));
    if (lightBg) document.documentElement.style.setProperty('--bg-light-rgb', hexToRgb(lightBg));
    if (redColor) document.documentElement.style.setProperty('--color-red-rgb', hexToRgb(redColor));

    updateDarkModeUI(); // This calls updateTexts which calls buildMainMenu
    addSamplePosts();

    const initialActiveNav = document.querySelector('.sidebar-left .nav-item.active');
    if (initialActiveNav) {
        loadPageContent(initialActiveNav.dataset.page);
    } else {
        loadPageContent('home');
        if(navHome) navHome.classList.add('active');
    }

    if (mainMenuBtn) {
        mainMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainMenuDropdown.classList.toggle('show');
            const langOpts = document.getElementById('languageOptionsMenu');
            if (!mainMenuDropdown.classList.contains('show') && langOpts) {
                 langOpts.style.display = 'none';
            }
        });
    }

    window.addEventListener('click', function(e) {
        if (mainMenuDropdown && mainMenuDropdown.classList.contains('show') && !mainMenuBtn.contains(e.target) && !mainMenuDropdown.contains(e.target)) {
            mainMenuDropdown.classList.remove('show');
            const langOpts = document.getElementById('languageOptionsMenu');
            if (langOpts) langOpts.style.display = 'none';
        }
    });

    if (loginForm) loginForm.addEventListener('submit', function(e) { e.preventDefault(); showMainApp(); });
    if (guestBtn) guestBtn.addEventListener('click', function() { showMainApp(); });

    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            if (selectedTag === this.dataset.tag) {
                selectedTag = '';
            } else {
                selectedTag = this.dataset.tag;
                this.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderPosts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderPosts();
        });
    }

    if (submitPost) {
        submitPost.addEventListener('click', function() {
            const content = postContent.value.trim();
            const t = translations[currentLang];
            if (!content) {
                alert(t.alertWriteSomething);
                return;
            }
            const newPost = {
                id: postIdCounter++, content: content, tag: selectedTag || 'curhat',
                time: new Date(), reactions: { heart: 0, hug: 0 },
                userReactions: { heart: false, hug: false },
                comments: []
            };
            posts.unshift(newPost);
            postContent.value = '';
            if(postContent.style) postContent.style.height = 'auto'; // Reset height
            selectedTag = '';
            document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
            renderPosts();
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            const page = this.dataset.page;
            loadPageContent(page);
        });
    });

    if (document.getElementById('sidebarPostBtn') && postContent) {
        document.getElementById('sidebarPostBtn').addEventListener('click', () => {
            const currentActivePage = document.querySelector('.sidebar-left .nav-item.active');
            if (currentActivePage && currentActivePage.dataset.page !== 'home') {
                loadPageContent('home');
                navItems.forEach(nav => nav.classList.remove('active'));
                if(navHome) navHome.classList.add('active');
            }
            setTimeout(() => { // Ensure main feed is visible before focusing
                postContent.focus();
                window.scrollTo({ top: postContent.offsetTop - 100, behavior: 'smooth' });
            }, 50);
        });
    }

    const trendingTagsList = document.getElementById('trendingTagsList');
    if (trendingTagsList) {
        trendingTagsList.addEventListener('click', function(e) {
            e.preventDefault();
            if (e.target.tagName === 'A' && e.target.dataset.filterTag) {
                const tagToFilter = e.target.dataset.filterTag;
                loadPageContent('home'); // Switch to home/feed view
                navItems.forEach(nav => nav.classList.remove('active'));
                if(navHome) navHome.classList.add('active');

                setTimeout(() => { // Ensure feed is rendered before clicking filter
                    const filterButton = document.querySelector(`.filter-btn[data-filter="${tagToFilter}"]`);
                    if (filterButton) {
                        filterButton.click();
                    } else { // Fallback if a direct filter button for the trending tag doesn't exist
                        currentFilter = tagToFilter;
                        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        renderPosts();
                    }
                    if(feed) feed.scrollIntoView({ behavior: 'smooth', block: 'start'});
                }, 50);
            }
        });
    }

    if (communityGuidelinesLink) {
        communityGuidelinesLink.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            loadPageContent(page);
            navItems.forEach(nav => nav.classList.remove('active'));
            const correspondingSidebarItem = document.querySelector(`.sidebar-nav .nav-item[data-page="${page}"]`);
            if (correspondingSidebarItem) {
                correspondingSidebarItem.classList.add('active');
            }
        });
    }

    pageContentContainer.addEventListener('click', function(e){
        const link = e.target.closest('a[data-page-link]');
        if(link){
            e.preventDefault();
            const page = link.dataset.pageLink;
            loadPageContent(page);
            navItems.forEach(nav => nav.classList.remove('active'));
            const correspondingSidebarItem = document.querySelector(`.sidebar-nav .nav-item[data-page="${page}"]`);
            if (correspondingSidebarItem) {
                correspondingSidebarItem.classList.add('active');
            }
        }
    });


    document.body.addEventListener('click', function(e) {
        const premiumButtonIds = ['upgradeToPremiumBtnPageExplore', 'upgradeToPremiumBtnPageStats', 'upgradeToPremiumBtnLock'];
        if (premiumButtonIds.includes(e.target.id)) {
            alert("Proses upgrade ke premium akan diimplementasikan di sini! Untuk demo, Anda sekarang dianggap premium.");
            isUserPremium = true;
            const currentPage = pageContentContainer.dataset.currentPage;
            if (currentPage && (currentPage === 'stats' || currentPage === 'explorePremium')) {
                 loadPageContent(currentPage); // Reload current premium page to show content
            }
        }
    });

    if (postContent) { // Ensure postContent exists
        postContent.addEventListener('input', function() { autoResizeTextarea(this, 80); }); // 80px min-height for post textarea

        // Ctrl+Enter or Cmd+Enter to submit post or comment
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                if (document.activeElement === postContent && submitPost) { submitPost.click(); }
                else if (document.activeElement && document.activeElement.classList.contains('comment-input')) {
                    const postId = document.activeElement.id.split('-')[2]; // Assuming ID is comment-input-POSTID
                    if (postId) {
                        addComment(parseInt(postId));
                    }
                }
            }
        });
    }

    // Button press effect
    document.addEventListener('click', function(e) {
        if (e.target.matches('.login-btn, .guest-btn, .submit-btn, .premium-btn-login, .sidebar-post-btn, .comment-submit-btn, .premium-unlock-btn, .setting-btn, .setting-btn-inline, .setting-btn-danger')) {
            e.target.style.transform = 'scale(0.98)';
            setTimeout(() => { e.target.style.transform = ''; }, 150);
        }
    });

});

function showMainApp() {
    if (loginPage) loginPage.style.display = 'none';
    if (mainAppWrapper) mainAppWrapper.style.display = 'flex';
    const activeNav = document.querySelector('.sidebar-left .nav-item.active');
    loadPageContent(activeNav ? activeNav.dataset.page : 'home');
    if(!activeNav && navHome) navHome.classList.add('active'); // Default to home if no active nav
    updateDarkModeUI();
}
function showLoginPage() {
    if (loginPage) loginPage.style.display = 'flex';
    if (mainAppWrapper) mainAppWrapper.style.display = 'none';
}

function updateDarkModeUI() {
    const isDark = document.body.classList.contains('dark-mode');
    if (loginLogo) loginLogo.src = isDark ? logoDarkSrc : logoLightSrc;
    if (mainAppLogo) mainAppLogo.src = isDark ? logoDarkSrc : logoLightSrc;
    updateTexts(currentLang); // This will also call buildMainMenu
}

function addSamplePosts() {
    posts = [
        { id: postIdCounter++, content: "Hari ini aku merasa sangat lelah dengan semua tuntutan hidup. Beban pekerjaan, ekspektasi orang lain, rasanya seperti tidak ada habisnya. Kadang ingin menghilang sejenak dari semua ini. Tapi aku tahu aku harus kuat. Berbagi di sini sedikit membantu melepaskan sesak di dada. #curhat #lelah", tag: "curhat", time: new Date(Date.now() - 2 * 3600000), reactions: { heart: 15, hug: 8 }, userReactions: { heart: false, hug: false }, comments: [ { text: "Aku ngerti banget perasaanmu. Kamu nggak sendirian kok. Semangat ya! Virtual hug buat kamu 🤗", time: new Date(Date.now() - 1.5 * 3600000) }, { text: "Sabar ya, badai pasti berlalu. Coba istirahat sebentar, kasih waktu buat diri sendiri.", time: new Date(Date.now() - 1 * 3600000) }]},
        { id: postIdCounter++, content: "Untuk kalian yang sedang berjuang hari ini: Kamu lebih kuat dari yang kamu kira. Setiap rintangan adalah kesempatan untuk tumbuh. Jangan pernah meragukan kemampuan dirimu sendiri. Teruslah melangkah, sekecil apapun progresnya, itu tetap progres! 💪 #motivasi #semangatpagi", tag: "motivasi", time: new Date(Date.now() - 5 * 3600000), reactions: { heart: 32, hug: 12 }, userReactions: { heart: false, hug: false }, comments: [] },
        { id: postIdCounter++, content: "Stress dengan deadline kerja yang menumpuk dan revisi yang nggak ada habisnya. Rasanya waktu 24 jam sehari tidak cukup. Ada yang punya tips mengatasi stress dan burnout karena pekerjaan? Butuh saran banget 😰 #stress #burnout #kerja", tag: "stress", time: new Date(Date.now() - 8 * 3600000), reactions: { heart: 7, hug: 23 }, userReactions: { heart: false, hug: false }, comments: [ { text: "Coba teknik pomodoro kak! Fokus kerja 25 menit, istirahat 5 menit. Lumayan ngebantu buat jaga fokus.", time: new Date(Date.now() - 7 * 3600000) }, { text: "Jangan lupa luangkan waktu buat me-time, walau sebentar. Nonton film, dengerin musik, atau jalan-jalan singkat bisa bantu recharge.", time: new Date(Date.now() - 6.5 * 3600000) }]},
    ];
}

function renderPosts() {
    if (!feed || (mainFeedContainer && mainFeedContainer.style.display === 'none')) return;
    const t = translations[currentLang];
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    let filteredPosts = posts;
    if (currentFilter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.tag === currentFilter);
    }
    if (searchTerm) {
        filteredPosts = filteredPosts.filter(post =>
            post.content.toLowerCase().includes(searchTerm) ||
            post.tag.toLowerCase().includes(searchTerm)
        );
    }

    if (filteredPosts.length === 0) {
        let emptyMsg = t.noPosts;
        if (currentFilter !== 'all' || searchTerm) {
             emptyMsg = `${t.noPostsFilter} "${currentFilter === 'all' && searchTerm ? searchTerm : (currentFilter !== 'all' ? '#'+currentFilter : t.all.toLowerCase())}${searchTerm && currentFilter !== 'all' ? ' & ' + searchTerm : ''}"`;
        }
        feed.innerHTML = `<div class="empty-state"><div class="empty-state-icon">💭</div><h3 id="emptyStateTitle">${emptyMsg}</h3><p id="emptyStateText">${t.beFirst}</p></div>`;
        if(document.getElementById('emptyStateTitle')) document.getElementById('emptyStateTitle').textContent = emptyMsg;
        if(document.getElementById('emptyStateText')) document.getElementById('emptyStateText').textContent = t.beFirst;
        return;
    }

    feed.innerHTML = filteredPosts.map(post => `
        <div class="post" data-id="${post.id}">
            <div class="post-header">
                <span class="post-tag">#${post.tag}</span>
                <span class="post-time">${formatTime(post.time)}</span>
            </div>
            <div class="post-content">${highlightSearchTerm(post.content.replace(/\n/g, '<br>'), searchTerm)}</div>
            <div class="post-actions">
                <button class="reaction-btn ${post.userReactions.heart ? 'active' : ''}" onclick="toggleReaction(${post.id}, 'heart')" title="Suka">
                    ❤️ <span>${post.reactions.heart}</span>
                </button>
                <button class="reaction-btn ${post.userReactions.hug ? 'active' : ''}" onclick="toggleReaction(${post.id}, 'hug')" title="Peluk">
                    🤗 <span>${post.reactions.hug}</span>
                </button>
                <button class="report-post-btn" onclick="reportPost(${post.id})" title="${t.reportButtonText}">
                    🚩
                </button>
            </div>
            <div class="post-comments-section">
                <h4 class="comments-title">${t.commentsTitle} (<span id="comment-count-${post.id}">${post.comments.length}</span>)</h4>
                <div class="comments-list" id="comments-list-${post.id}">
                    ${post.comments.length === 0 ? `<p class="no-comments-text">${t.noCommentsYet}</p>` : post.comments.map(comment => `
                        <div class="comment">
                            <p class="comment-text">${highlightSearchTerm(comment.text.replace(/\n/g, '<br>'), searchTerm && comment.text.toLowerCase().includes(searchTerm) ? searchTerm: '' )}</p>
                            <span class="comment-time">${formatTime(comment.time)}</span>
                        </div>`).join('')}
                </div>
                <div class="comment-form">
                    <textarea class="comment-input" id="comment-input-${post.id}" placeholder="${t.commentPlaceholder}" oninput="autoResizeTextarea(this)"></textarea>
                    <button class="comment-submit-btn" onclick="addComment(${post.id})">${t.submitCommentBtn}</button>
                </div>
            </div>
        </div>`).join('');
}

function reportPost(postId) {
    const t = translations[currentLang];
    if (confirm(t.reportConfirmText)) {
        console.log(`Postingan dengan ID ${postId} dilaporkan.`);
        alert(t.postReportedText);
    }
}

function highlightSearchTerm(text, term) {
    if (!term || term.trim() === "") return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function toggleReaction(postId, reactionType) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    if (post.userReactions[reactionType]) {
        post.reactions[reactionType]--;
        post.userReactions[reactionType] = false;
    } else {
        post.reactions[reactionType]++;
        post.userReactions[reactionType] = true;
    }
    renderPosts();
}

function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const text = commentInput.value.trim();
    const t = translations[currentLang];

    if (!text) {
        alert(t.alertWriteComment);
        return;
    }
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({ text: text, time: new Date() });
        commentInput.value = '';
        commentInput.style.height = 'auto'; // Reset height after submit
        renderPosts();
    }
}

function formatTime(timeInput) {
    const langFormat = translations[currentLang].formatTime;
    const time = typeof timeInput === 'string' ? new Date(timeInput) : timeInput;
    const now = new Date();
    const diff = now - time;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 5) return langFormat.justNow;
    if (seconds < 60) return langFormat.justNow; // Changed from "seconds < 60) return `${seconds} detik yang lalu`
    if (minutes === 1) return `1${langFormat.minuteAgo}`;
    if (minutes < 60) return `${minutes}${langFormat.minutesAgo}`;
    if (hours === 1) return `1${langFormat.hourAgo}`;
    if (hours < 24) return `${hours}${langFormat.hoursAgo}`;
    if (days === 1) return `1${langFormat.dayAgo}`;
    return `${days}${langFormat.daysAgo}`;
}

function autoResizeTextarea(textarea, minHeight = 40) { // Default minHeight 40px for comments
    textarea.style.height = 'auto';
    textarea.style.height = Math.max(minHeight, textarea.scrollHeight) + 'px';
}

function loadPageContent(page, doRenderPosts = true) {
    const t = translations[currentLang];
    if (mainFeedContainer) mainFeedContainer.style.display = 'none';
    if (pageContentContainer) {
        pageContentContainer.style.display = 'none';
        pageContentContainer.innerHTML = ''; // Clear previous content
        pageContentContainer.dataset.currentPage = page; // Store current page for premium logic
    }

    if (page === 'home') {
        if (mainFeedContainer) mainFeedContainer.style.display = 'block';
        if (doRenderPosts) renderPosts();
    } else {
        if (pageContentContainer) {
            pageContentContainer.style.display = 'block';
            let titleKey = '';
            let contentKey = '';
            let isPremiumPage = false;
            let customLockTitle = null;
            let customLockMessage = null;

            switch(page) {
                case 'explore': titleKey = 'pageTitleExplore'; contentKey = 'exploreContent'; break;
                case 'stats':
                    titleKey = 'pageTitleStats';
                    contentKey = 'statsContent';
                    isPremiumPage = true;
                    customLockTitle = t.premiumFeatureLockTitle;
                    customLockMessage = t.premiumFeatureLockMessage;
                    break;
                case 'explorePremium': titleKey = 'pageTitleExplorePremium'; contentKey = 'explorePremiumContent'; break;
                case 'resources': titleKey = 'pageTitleResources'; contentKey = 'resourcesContent'; break;
                case 'guidelines': titleKey = 'pageTitleGuidelines'; contentKey = 'guidelinesContent'; break;
                case 'about': titleKey = 'pageTitleAbout'; contentKey = 'aboutContent'; break;
                case 'settings': titleKey = 'pageTitleSettings'; contentKey = 'settingsContent'; break;
                case 'contactCS': titleKey = 'pageTitleContactCS'; contentKey = 'contactCSContent'; break;
                default: titleKey = "pageTitleNotFound"; contentKey = "pageContentNotFound";
                    if (!t[titleKey]) t[titleKey] = currentLang === 'id' ? "Halaman Tidak Ditemukan" : "Page Not Found";
                    if (!t[contentKey]) t[contentKey] = currentLang === 'id' ? "<p>Maaf, konten untuk halaman ini tidak tersedia.</p>" : "<p>Sorry, content for this page is not available.</p>";
            }

            const title = t[titleKey];
            const contentHTML = t[contentKey];

            pageContentContainer.innerHTML = `<h2>${title}</h2><div class="page-actual-content">${contentHTML}</div>`;

            if (isPremiumPage && !isUserPremium) {
                const pageActualContent = pageContentContainer.querySelector('.page-actual-content');
                if (pageActualContent) {
                     pageActualContent.innerHTML = `
                        <div class="premium-lock-overlay-fullpage"> {/* Changed class for consistent styling */}
                            <div class="lock-icon">🔒</div>
                            <h3>${customLockTitle}</h3>
                            <p>${customLockMessage}</p>
                            <button class="premium-unlock-btn" id="upgradeToPremiumBtnLock">${t.becomePremium}</button>
                        </div>`;
                }
            }
        }
    }
}
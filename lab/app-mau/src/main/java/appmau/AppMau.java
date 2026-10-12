package appmau;

import jakarta.annotation.PreDestroy;
import java.util.List;
import java.util.Map;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// App mẫu của cả khoá: một API ghi chú nhỏ, lưu dữ liệu vào PostgreSQL.
// GET /          app còn sống không, PID bao nhiêu (không cần database)
// GET /ghi-chu   đọc mọi ghi chú   (cần database)
// POST /ghi-chu  thêm một ghi chú  (cần database)
@SpringBootApplication
@RestController
public class AppMau {

  private final JdbcTemplate db;

  public AppMau(JdbcTemplate db) {
    this.db = db;
  }

  public static void main(String[] args) {
    SpringApplication.run(AppMau.class, args);
  }

  @EventListener(ApplicationReadyEvent.class)
  void sanSang() {
    System.out.println("[app-mau] PID = " + ProcessHandle.current().pid() + ", dang listen port 8080");
  }

  // Chỉ chạy khi process được báo trước (SIGTERM, Ctrl+C). Bị SIGKILL thì không dòng nào ở đây kịp chạy.
  @PreDestroy
  void donDep() {
    System.out.println("[app-mau] duoc bao truoc, dang don dep roi thoat");
  }

  @GetMapping("/")
  Map<String, Object> song() {
    return Map.of("app", "app-mau", "pid", ProcessHandle.current().pid());
  }

  @GetMapping("/ghi-chu")
  List<Map<String, Object>> doc() {
    taoBangNeuChuaCo();
    return db.queryForList("SELECT id, noi_dung, luc_tao FROM ghi_chu ORDER BY id");
  }

  @PostMapping("/ghi-chu")
  Map<String, Object> them(@RequestBody String noiDung) {
    taoBangNeuChuaCo();
    return db.queryForMap(
        "INSERT INTO ghi_chu (noi_dung) VALUES (?) RETURNING id, noi_dung, luc_tao", noiDung);
  }

  private void taoBangNeuChuaCo() {
    db.execute(
        "CREATE TABLE IF NOT EXISTS ghi_chu ("
            + "id BIGSERIAL PRIMARY KEY, noi_dung TEXT NOT NULL, luc_tao TIMESTAMPTZ NOT NULL DEFAULT now())");
  }
}

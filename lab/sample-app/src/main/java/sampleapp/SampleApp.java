package sampleapp;

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
// GET /         app còn sống không, PID bao nhiêu (không cần database)
// GET /notes    đọc mọi ghi chú   (cần database)
// POST /notes   thêm một ghi chú  (cần database)
@SpringBootApplication
@RestController
public class SampleApp {

  private final JdbcTemplate db;

  public SampleApp(JdbcTemplate db) {
    this.db = db;
  }

  public static void main(String[] args) {
    SpringApplication.run(SampleApp.class, args);
  }

  @EventListener(ApplicationReadyEvent.class)
  void onReady() {
    System.out.println("[sample-app] PID = " + ProcessHandle.current().pid() + ", listening on port 8080");
  }

  // Chỉ chạy khi process được báo trước (SIGTERM, Ctrl+C). Bị SIGKILL thì không dòng nào ở đây kịp chạy.
  @PreDestroy
  void onShutdown() {
    System.out.println("[sample-app] shutdown requested, cleaning up before exit");
  }

  @GetMapping("/")
  Map<String, Object> alive() {
    return Map.of("app", "sample-app", "pid", ProcessHandle.current().pid());
  }

  @GetMapping("/notes")
  List<Map<String, Object>> listNotes() {
    ensureTable();
    return db.queryForList("SELECT id, content, created_at FROM notes ORDER BY id");
  }

  @PostMapping("/notes")
  Map<String, Object> addNote(@RequestBody String content) {
    ensureTable();
    return db.queryForMap(
        "INSERT INTO notes (content) VALUES (?) RETURNING id, content, created_at", content);
  }

  private void ensureTable() {
    db.execute(
        "CREATE TABLE IF NOT EXISTS notes ("
            + "id BIGSERIAL PRIMARY KEY, content TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())");
  }
}

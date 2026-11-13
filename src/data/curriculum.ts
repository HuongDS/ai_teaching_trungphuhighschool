export interface Stage {
  id: string;
  timeRange: string;
  durationMinutes: number;
  title: string;
  purpose: string;
  teacherScript: string; // Lời thoại gợi mở dành cho thầy cô
  contentBlocks: {
    heading?: string;
    description?: string;
    bulletPoints?: string[];
    callout?: {
      type: 'tip' | 'warning' | 'info' | 'quote';
      text: string;
    };
  }[];
}

export interface PromptItem {
  title: string;
  category: string;
  prompt: string;
  explanation?: string;
}

export interface Lesson {
  id: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  coreObjective: string;
  teacherRead2Min: {
    coreConcept: string;
    pedagogicalKey: string;
    commonMistake: string;
  };
  stages: Stage[];
  prompts: PromptItem[];
  interactiveType:
    | 'author-game'
    | 'ai-classifier'
    | 'superpowers-demo'
    | 'prompt-surgeon'
    | 'socratic-sim'
    | 'hallucination-detect'
    | 'roleplay-lit'
    | 'writing-clinic'
    | 'quiz-generator'
    | 'slide-compare'
    | 'career-map'
    | 'final-project-guide'
    | 'rubric-proclamation';
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Tiết 1: AI là gì? Phân biệt Trí tuệ máy & Trí tuệ người',
    shortTitle: 'Tiết 1: Bản chất AI',
    subtitle: 'Mô hình Input - Process - Output và Phân biệt tự động hóa thông thường vs AI',
    coreObjective: 'Hiểu bản chất AI không phải ma thuật, nhận diện AI trong đời sống và phân biệt với máy tính thông thường.',
    teacherRead2Min: {
      coreConcept: 'AI không có cảm xúc hay ý thức. AI như một siêu thủ thư tính toán xác suất từ ngữ kế tiếp.',
      pedagogicalKey: 'Nhấn mạnh mô hình 3 bước: Đầu vào (Input) -> Xử lý (Processing) -> Đầu ra (Output).',
      commonMistake: 'Học sinh nhầm lẫn mọi thiết bị điện tử (như máy tính Casio, lò vi sóng) đều là AI.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Một ngày không có AI',
        purpose: 'Kéo sự chú ý của cả lớp vào vai trò vô hình của AI trong cuộc sống hàng ngày.',
        teacherScript: 'Chào cả lớp! Hãy tưởng tượng sáng mai thức dậy, toàn bộ YouTube, TikTok, Google Maps, FaceID đều ngừng hoạt động. Cuộc sống các em sẽ đảo lộn ra sao?',
        contentBlocks: [
          {
            heading: 'Tưởng tượng: Một ngày thế giới ngắt kết nối AI',
            description: 'Các ứng dụng hàng ngày các em dùng đều đang vận hành bởi các mô hình AI âm thầm:',
            bulletPoints: [
              'Không có thuật toán đề xuất video TikTok / YouTube theo sở thích.',
              'Google Maps không tính toán được tuyến đường tránh kẹt xe theo thời gian thực.',
              'Điện thoại không mở khóa được bằng nhận diện khuôn mặt (FaceID).',
              'Không có công cụ dịch tự động đa ngôn ngữ khi đọc tài liệu.'
            ],
            callout: {
              type: 'info',
              text: 'AI đang hiện diện ở khắp mọi nơi quanh ta, nhưng đa số chúng ta chưa từng nhìn thấu bản chất cách nó vận hành!'
            }
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 17 phút',
        durationMinutes: 12,
        title: 'Khám phá: AI hoạt động như thế nào?',
        purpose: 'Chuẩn hóa mô hình 3 bước Input -> Processing -> Output và so sánh Casio vs AI.',
        teacherScript: 'Chiếc máy tính Casio các em bấm giải phương trình bậc 2 mỗi ngày có phải là AI không? Tại sao?',
        contentBlocks: [
          {
            heading: 'Mô hình 3 bước của mọi hệ thống AI',
            bulletPoints: [
              '📥 ĐẦU VÀO (Input): Câu hỏi, hình ảnh, văn bản hoặc âm thanh do con người cung cấp.',
              '⚙️ XỬ LÝ (Processing): AI phân tích ngữ cảnh, đối chiếu hàng triệu dữ liệu mẫu đã học để tính toán phương án tối ưu.',
              '📤 ĐẦU RA (Output): Câu trả lời văn bản, hình ảnh tái tạo, hoặc đề xuất hành động phù hợp.'
            ]
          },
          {
            heading: 'So sánh cốt lõi: Tự động hóa cố định vs Trí tuệ nhân tạo (AI)',
            bulletPoints: [
              'Máy tính Casio / Lò vi sóng: Làm theo tập lệnh lập trình cố định (Fixed rules). Cứ bấm A thì ra B.',
              'Hệ thống AI: Học từ khối lượng dữ liệu khổng lồ (Machine Learning), có khả năng thích ứng và suy đoán trên các tình huống mới chưa từng thấy trước đó.'
            ],
            callout: {
              type: 'quote',
              text: 'AI giỏi ghi nhớ và tính toán xác suất. Con người vượt trội AI ở cảm xúc, đạo đức và sự sáng tạo độc bản.'
            }
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: Game "Ai là tác giả?" & Phân loại 10 tình huống',
        purpose: 'Tương tác sôi nổi trên màn hình TV lớp học với 2 hoạt động thử thách phân tích.',
        teacherScript: 'Thầy/Cô sẽ chiếu 2 đoạn văn cùng miêu tả Cơn mưa rào mùa hạ. Cả lớp hãy quan sát và biểu quyết xem đoạn nào do AI viết, đoạn nào do người viết!',
        contentBlocks: [
          {
            heading: 'Hoạt động tương tác 1: Game "Ai là tác giả?"',
            description: 'Đọc 2 đoạn văn trên màn hình và phân tích sự khác nhau giữa văn phong AI và cảm xúc con người.'
          },
          {
            heading: 'Hoạt động tương tác 2: Phiếu phân loại 10 thiết bị quanh ta',
            description: 'Bấm chọn trực tiếp trên màn hình xem thiết bị nào CÓ ứng dụng AI và thiết bị nào là TỰ ĐỘNG HÓA THƯỜNG.'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Thảo luận & Đúc kết: AI khác con người ở điểm nào?',
        purpose: 'Khắc sâu vị thế con người là chủ thể, AI là trợ lý.',
        teacherScript: 'Nếu AI thông minh như vậy, liệu nó có thể thay thế hoàn toàn một người học sinh THPT không?',
        contentBlocks: [
          {
            heading: '3 Thông điệp vàng cần ghi nhớ',
            bulletPoints: [
              '1. AI là một cỗ máy xử lý dữ liệu và xác suất, không có linh hồn hay nhận thức.',
              '2. Con người độc nhất vô nhị ở: Trải nghiệm sống cá nhân, sự thấu cảm và trách nhiệm đạo đức.',
              '3. AI là công cụ khuếch đại năng lực của người thông minh, không thể thay thế việc tự học của các em.'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Giao nhiệm vụ vận dụng tại nhà',
        purpose: 'Kết nối bài học vào cuộc sống gia đình học sinh.',
        teacherScript: 'Về nhà, mỗi em hãy tìm 3 thiết bị hoặc ứng dụng quanh nhà có dùng AI và ghi chú xem nó giúp con người việc gì.',
        contentBlocks: [
          {
            heading: 'Nhiệm vụ về nhà',
            bulletPoints: [
              'Tìm 3 ứng dụng/thiết bị có AI trong gia đình em.',
              'Ghi lại: Đầu vào (Input) của nó là gì? Đầu ra (Output) nó trả về là gì?'
            ]
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Phân tích bản chất AI cho học sinh',
        category: 'Nhập môn',
        prompt: 'Bạn là một chuyên gia công nghệ thân thiện. Hãy giải thích bản chất hoạt động của AI cho một học sinh lớp 10 hiểu qua mô hình Input - Processing - Output, lấy ví dụ thực tế về việc gợi ý video trên TikTok.',
        explanation: 'Prompt mẫu giúp giáo viên biểu diễn ngay trên lớp.'
      }
    ],
    interactiveType: 'author-game'
  },
  {
    id: 2,
    title: 'Tiết 2: Khám phá "Siêu năng lực" của AI tạo sinh (GenAI)',
    shortTitle: 'Tiết 2: Siêu năng lực GenAI',
    subtitle: '4 khả năng cốt lõi & Bí quyết đối thoại nhiều lượt (Multi-turn conversation)',
    coreObjective: 'Nắm 4 năng lực chính của GenAI và thuần thục kỹ năng hỏi nối tiếp nhiều lượt để đạt kết quả chuẩn xác.',
    teacherRead2Min: {
      coreConcept: 'GenAI khác Google: Google trả về đường link; GenAI trực tiếp tổng hợp, viết mới và suy luận theo bối cảnh.',
      pedagogicalKey: 'Không bao giờ dừng lại ở câu trả lời đầu tiên (Hiệp 1). Luôn huấn luyện học sinh đặt câu hỏi tiếp nối.',
      commonMistake: 'Học sinh hỏi 1 câu thấy chưa đúng ý là vội tắt máy chê AI dở.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Trợ lý vạn năng 24/7',
        purpose: 'Khơi gợi nhu cầu tự học của học sinh lúc đêm khuya.',
        teacherScript: 'Nếu nhà trường cấp cho mỗi em 1 gia sư riêng biết mọi kiến thức và sẵn sàng trả lời lúc 12h đêm, em sẽ hỏi việc gì đầu tiên?',
        contentBlocks: [
          {
            heading: 'Nhu cầu thực tế của học sinh THPT',
            bulletPoints: [
              'Gặp bài toán khó lúc 11h đêm không biết hỏi ai.',
              'Cần dịch một câu tiếng Anh tự nhiên trước giờ nộp bài.',
              'Cần ý tưởng làm bài thuyết trình nhưng đang cạn kiệt sáng tạo.'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 18 phút',
        durationMinutes: 13,
        title: 'Khám phá: 4 "Siêu năng lực" của AI tạo sinh',
        purpose: 'Thầy cô demo trực tiếp trên màn hình chiếu 4 tác vụ then chốt.',
        teacherScript: 'Hãy nhìn thầy/cô ra lệnh cho AI thực hiện 4 việc hoàn toàn khác nhau trong nháy mắt!',
        contentBlocks: [
          {
            heading: '4 Năng lực nổi bật của GenAI',
            bulletPoints: [
              '1. 💡 GIẢI THÍCH TRỰC QUAN: Biến khái niệm phức tạp thành ẩn dụ bình dân dễ hiểu.',
              '2. 📑 TÓM TẮT SIÊU TỐC: Rút gọn tài liệu 2000 chữ thành 3 gạch đầu dòng then chốt.',
              '3. ✨ KHƠI NGUỒN SÁNG TẠO: Động não tên dự án, chủ đề sinh hoạt, kịch bản sáng tạo.',
              '4. 🎭 ĐÓNG VAI CHUYÊN GIA (Roleplay): Hóa thân thành bác sĩ, gia sư, nhân vật lịch sử.'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: Thử thách "Cuộc trò chuyện 3 hiệp"',
        purpose: 'Rèn luyện kỹ năng Multi-turn prompting trên màn hình chiếu.',
        teacherScript: 'Chúng ta sẽ cùng AI trải qua 3 hiệp đối thoại về Hiện tượng El Nino để xem câu trả lời tiến hóa thế nào!',
        contentBlocks: [
          {
            heading: 'Tiến trình 3 hiệp đối thoại',
            bulletPoints: [
              'Hiệp 1 (Hỏi thô): "El Nino là gì?" -> Kết quả hàn lâm, dài dòng.',
              'Hiệp 2 (Thu hẹp bối cảnh): "Dài quá, giải thích lại dưới 50 từ và cho 1 ví dụ ở Việt Nam."',
              'Hiệp 3 (Thách đố kiểm tra): "Tạo cho tôi 2 câu trắc nghiệm vui để xem tôi đã hiểu đúng chưa, giấu đáp án vội!"'
            ]
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Đúc kết: Sức mạnh của việc đào sâu ngữ cảnh',
        purpose: 'Rút ra bài học: AI càng trò chuyện nhiều trong 1 phiên chat thì càng thông minh và hiểu ý ta.',
        teacherScript: 'Học sinh thành công với AI là người biết kiên nhẫn đối thoại nhiều lượt!',
        contentBlocks: [
          {
            heading: 'Nguyên lý hội thoại tiếp diễn',
            bulletPoints: [
              'Giữ nguyên ngữ cảnh trong cùng một phiên chat.',
              'Dùng các lệnh sửa đổi: "Nói ngắn hơn", "Lấy ví dụ khác gần gũi hơn", "Trình bày thành bảng".'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Giao nhiệm vụ về nhà',
        purpose: 'Thực hành ít nhất 3 lượt hỏi đáp.',
        teacherScript: 'Về nhà, hãy mở 1 phiên chat về chủ đề em yêu thích và trò chuyện ít nhất 3 hiệp.',
        contentBlocks: [
          {
            heading: 'Bài tập về nhà',
            description: 'Chụp lại màn hình cuộc hội thoại 3 hiệp và gửi vào nhóm học tập của lớp.'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt Hiệp 1: Hỏi cơ bản',
        category: 'Đối thoại',
        prompt: 'Hiện tượng El Nino là gì?',
        explanation: 'Dùng để so sánh câu trả lời ban đầu với câu trả lời sau khi được tinh chỉnh.'
      },
      {
        title: 'Prompt Hiệp 2: Tinh chỉnh ngắn gọn',
        category: 'Đối thoại',
        prompt: 'Câu trả lời vừa rồi quá dài và nhiều thuật ngữ chuyên môn. Hãy giải thích lại ngắn gọn dưới 50 từ, sử dụng ví dụ về thời tiết mùa hè tại Việt Nam để học sinh lớp 10 hiểu ngay.',
        explanation: 'Thêm ràng buộc độ dài và bối cảnh địa phương.'
      },
      {
        title: 'Prompt Hiệp 3: Kiểm tra mức độ hiểu bài',
        category: 'Đối thoại',
        prompt: 'Tuyệt vời. Bây giờ bạn hãy đóng vai người ra đề và đặt cho tôi 2 câu hỏi trắc nghiệm kiểm tra nhanh kiến thức vừa giải thích. Đừng hiện đáp án vội, hãy chờ tôi trả lời từng câu.',
        explanation: 'Biến AI thành người kiểm tra chủ động.'
      }
    ],
    interactiveType: 'superpowers-demo'
  },
  {
    id: 3,
    title: 'Tiết 3: Nghệ thuật Prompting – Công thức chuẩn R-T-C-C-F',
    shortTitle: 'Tiết 3: Công thức R-T-C-C-F',
    subtitle: 'Làm chủ 5 thành tố vàng để câu lệnh ra kết quả xuất sắc gấp 10 lần',
    coreObjective: 'Thành thạo công thức R-T-C-C-F (Role, Task, Context, Constraints, Format) và biết nâng cấp câu lệnh mơ hồ.',
    teacherRead2Min: {
      coreConcept: 'Quy luật: Garbage In, Garbage Out (Đầu vào mơ hồ, đầu ra rác rưởi). Chi tiết rõ ràng mang lại kết quả tinh hoa.',
      pedagogicalKey: 'Dùng màu sắc phân tách rõ 5 thành tố trên màn hình TV để học sinh dễ nhớ như một công thức Toán học.',
      commonMistake: 'Học sinh chỉ ra lệnh cụt lủn (Task) mà quên mất Role, Context, Constraints và Format.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: So sánh 2 câu lệnh đối lập',
        purpose: 'Chiếu 2 câu lệnh A và B lên TV để cả lớp thấy ngay sự chênh lệch kết quả một trời một vực.',
        teacherScript: 'Tại sao cùng nhờ AI lập thời khóa biểu ôn thi, câu lệnh A cho ra kết quả vô thưởng vô phạt, còn câu lệnh B lại dùng được ngay lập tức?',
        contentBlocks: [
          {
            heading: 'Đối chiếu kết quả 2 Prompt',
            bulletPoints: [
              'Câu lệnh A: "Lập thời khóa biểu ôn thi cho tôi." -> AI trả lời chung chung, không sát thực tế.',
              'Câu lệnh B: Đầy đủ Vai trò, Bối cảnh học sinh lớp 12 mất gốc Toán, Giới hạn 45 phút/ngày và Định dạng bảng.'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 18 phút',
        durationMinutes: 13,
        title: 'Giảng giải: Giải phẫu công thức R - T - C - C - F',
        purpose: 'Phân tích chi tiết 5 thành tố chuẩn quốc tế.',
        teacherScript: 'Hãy ghi nhớ 5 chữ cái vàng này, nó sẽ theo các em suốt từ cấp 3 lên Đại học và đi làm!',
        contentBlocks: [
          {
            heading: 'Công thức 5 thành tố R-T-C-C-F',
            bulletPoints: [
              '🔴 R (Role - Vai trò): Gán chuyên môn cho AI (Gia sư, Bác sĩ, Trưởng ban tuyển sinh...).',
              '🔵 T (Task - Nhiệm vụ): Hành động cụ thể cần làm (Lập bảng, Tóm tắt, Chữa bài, Phân tích...).',
              '🟢 C (Context - Bối cảnh): Thông tin người hỏi (Học sinh lớp 11, chuẩn bị thi học kỳ, mất gốc...).',
              '🟡 C (Constraints - Giới hạn): Rào cản bắt buộc (Dưới 200 từ, không dùng từ khó, trong 30 phút...).',
              '🟣 F (Format - Định dạng): Hình thức kết quả (Bảng 4 cột, gạch đầu dòng, sơ đồ, thơ...).'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: "Phẫu thuật câu lệnh" & Lập kế hoạch 14 ngày',
        purpose: 'Thực hành nâng cấp câu lệnh mơ hồ thành siêu câu lệnh trên màn hình TV.',
        teacherScript: 'Bây giờ thầy/cô sẽ mời một bạn lên bảng chọn từng mảnh ghép R-T-C-C-F để lắp ghép thành câu lệnh hoàn chỉnh!',
        contentBlocks: [
          {
            heading: 'Thử thách phẫu thuật',
            description: 'Biến câu lệnh mơ hồ: "Chỉ tôi cách học giỏi tiếng Anh" thành câu lệnh chuẩn R-T-C-C-F.'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Đánh giá & Chiếu sản phẩm mẫu',
        purpose: 'Nhận xét câu lệnh theo tiêu chuẩn 5 thành tố.',
        teacherScript: 'Một câu lệnh tốt là câu lệnh mà người khác đọc vào cũng hiểu ngay bạn đang cần gì!',
        contentBlocks: [
          {
            heading: 'Tiêu chuẩn đánh giá câu lệnh',
            bulletPoints: [
              'Có đủ ít nhất 4/5 thành tố không?',
              'Giới hạn (Constraints) có thực tế và khả thi với thời gian biểu không?',
              'Định dạng đầu ra có dễ đọc trên điện thoại/vở ghi không?'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Tổng kết công thức bỏ túi',
        purpose: 'Nhắc học sinh lưu bảng công thức R-T-C-C-F.',
        teacherScript: 'Hãy lưu lại công thức này vào ghi chú điện thoại hoặc kẹp vào bìa sách giáo khoa!',
        contentBlocks: [
          {
            heading: 'Ghi nhớ',
            description: 'Chất lượng kết quả phụ thuộc hoàn toàn vào độ sắc bén của câu lệnh!'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt chuẩn: Lập kế hoạch 14 ngày bứt phá điểm số',
        category: 'Học tập cá nhân',
        prompt: `[ROLE]: Bạn là một cố vấn học tập cấp THPT giàu kinh nghiệm và cực kỳ tâm lý.
[CONTEXT]: Tôi là học sinh lớp 11 đang bị hổng kiến thức môn Hóa học, đặc biệt là phần Cân bằng phản ứng Oxi hóa - Khử.
[TASK]: Hãy xây dựng cho tôi một lộ trình tự học cải thiện điểm số trong vòng 14 ngày.
[CONSTRAINTS]: Mỗi ngày tôi chỉ có 30 phút tự học buổi tối. Lộ trình phải đi từ ví dụ trực quan dễ hiểu nhất rồi mới nâng dần độ khó. Không viết lý thuyết suông, mỗi ngày phải có 1 bài tập áp dụng.
[FORMAT]: Trình bày dạng bảng gồm 4 cột: Ngày - Mục tiêu kiến thức - Dạng bài tập - Tiêu chí tự đánh giá hoàn thành.`,
        explanation: 'Câu lệnh hoàn hảo ứng dụng trọn vẹn 5 thành tố R-T-C-C-F.'
      }
    ],
    interactiveType: 'prompt-surgeon'
  },
  {
    id: 4,
    title: 'Tiết 4: Kỹ thuật đào sâu – Biến AI thành "Gia sư Socratic" kiên nhẫn',
    shortTitle: 'Tiết 4: Gia sư Socratic',
    subtitle: 'Nói không với chép đáp án đối phó – Kích hoạt tư duy dẫn dắt từng bước',
    coreObjective: 'Biết cách ra lệnh cấm AI cho đáp án ngay, buộc AI đặt câu hỏi gợi mở để bản thân tự tìm ra lời giải.',
    teacherRead2Min: {
      coreConcept: 'Phương pháp Socratic: Thầy không đọc chép đáp án mà đặt câu hỏi gợi mở để trò tự bừng sáng tri thức.',
      pedagogicalKey: 'Cảnh báo nguy cơ "teo não" nếu học sinh biến AI thành xe ôm chở mình thay vì huấn luyện viên ép mình chạy.',
      commonMistake: 'Học sinh chỉ copy đề bài quăng vào chatbot rồi chép y nguyên kết quả nộp thầy cô.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 07 phút',
        durationMinutes: 7,
        title: 'Khởi động: Thuê xe ôm chạy việt dã hộ',
        purpose: 'Đặt vấn đề trực diện và đánh vào lòng tự trọng của học sinh.',
        teacherScript: 'Nếu sắp thi chạy việt dã mà ngày nào các em cũng thuê xe ôm chở chạy hết quãng đường, đến ngày thi thật chuyện gì xảy ra?',
        contentBlocks: [
          {
            heading: 'Nghịch lý dùng AI làm bài tập hộ',
            bulletPoints: [
              'Chép đáp án AI: AI ngày càng thông minh hơn, còn tư duy của học sinh thì ngày càng cùn mòn.',
              'Gia sư Socratic: AI trở thành huấn luyện viên kiên nhẫn, chỉ điểm gợi ý để học sinh tự mình vượt chướng ngại vật.'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '07 - 18 phút',
        durationMinutes: 11,
        title: 'Kỹ thuật Prompting: "Câu lệnh thần chú" Socratic',
        purpose: 'Dạy cấu trúc câu lệnh khóa đáp án và kích hoạt chế độ gia sư kiên nhẫn.',
        teacherScript: 'Hãy xem cách thầy/cô biến AI thành một người thầy không bao giờ chịu đưa đáp án nếu các em chưa chịu suy nghĩ!',
        contentBlocks: [
          {
            heading: '3 Quy tắc vàng trong Prompt Socratic',
            bulletPoints: [
              '1. Quy tắc cấm: Tuyệt đối KHÔNG ĐƯỢC giải hộ hoặc đưa ra đáp án cuối cùng.',
              '2. Quy tắc chia nhỏ: Chia bài toán thành từng bước tư duy nhỏ.',
              '3. Quy tắc chờ đợi: Chỉ đặt 1 câu hỏi gợi mở mỗi lượt và chờ người học trả lời mới đi tiếp.'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: Thử thách giải câu đố logic cùng Gia sư AI',
        purpose: 'Trình diễn cuộc đối thoại trực tiếp trên TV với câu đố Con gấu màu gì.',
        teacherScript: 'Cả lớp hãy cùng thầy/cô trả lời từng câu hỏi gợi mở của gia sư AI để tìm ra màu lông của con gấu!',
        contentBlocks: [
          {
            heading: 'Bài toán logic thực tế',
            description: 'Người thợ săn đi 1km Nam -> 1km Đông -> 1km Bắc và quay về điểm xuất phát. Nhìn thấy con gấu. Con gấu màu gì?'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Chia sẻ cảm nhận: Tự giải được cảm giác thế nào?',
        purpose: 'Khẳng định niềm hạnh phúc khi tự mình vượt qua bài toán khó.',
        teacherScript: 'Cảm giác khi tự mình suy luận ra đáp án sướng hơn rất nhiều so với việc chỉ chép bài từ trên mạng xuống đúng không các em?',
        contentBlocks: [
          {
            heading: 'Bài học đúc kết',
            bulletPoints: [
              'Người dẫn đầu dùng AI để tăng cơ bắp trí tuệ, không dùng AI để ỷ lại.',
              'Mỗi lần tự suy luận ra một câu gợi ý là một lần não bộ tạo thêm liên kết nơ-ron thần kinh mới.'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Tổng kết & Cam kết học thật',
        purpose: 'Ghi nhớ công thức Socratic cho mọi môn học.',
        teacherScript: 'Từ nay về sau, gặp bài tập khó, hãy dùng cú pháp Socratic này trước khi hỏi thầy cô!',
        contentBlocks: [
          {
            heading: 'Cam kết hành động',
            description: 'Luôn kèm điều kiện: "Hãy đặt câu hỏi gợi ý từng bước, đừng cho đáp án vội!"'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Câu lệnh Gia sư Socratic chuẩn mực',
        category: 'Phương pháp học',
        prompt: `Bạn là một gia sư [Tên môn học] THPT cực kỳ tâm lý và kiên nhẫn. Tôi đang gặp khó khăn khi giải bài tập sau:
"[Dán đề bài tập vào đây]"

QUY TẮC BẮT BUỘC:
1. Tuyệt đối KHÔNG ĐƯỢC giải hộ hoặc đưa ra đáp án cuối cùng.
2. Hãy chia bài tập thành các bước nhỏ. Đầu tiên, hãy đặt cho tôi 01 câu hỏi gợi ý để tôi nhớ lại công thức hoặc khái niệm cơ bản cần dùng.
3. Hãy chờ tôi trả lời từng câu. Sau khi tôi trả lời, hãy nhận xét đúng/sai và gợi ý bước tiếp theo cho đến khi tôi tự giải được hoàn chỉnh bài toán.`,
        explanation: 'Prompt thần chú giúp học sinh rèn luyện tư duy tự thân.'
      }
    ],
    interactiveType: 'socratic-sim'
  },
  {
    id: 5,
    title: 'Tiết 5: Tư duy phản biện – Bẫy "Ảo giác" & Đạo đức học đường',
    shortTitle: 'Tiết 5: Bẫy Ảo giác & 5 KHÔNG',
    subtitle: 'Giải mã hiện tượng Hallucination, quy trình kiểm chứng C-O-D-E & Quy tắc 5 KHÔNG',
    coreObjective: 'Nhận diện hiện tượng AI bịa đặt thông tin tự tin, nắm vững quy trình kiểm chứng chéo và tuân thủ đạo đức học đường.',
    teacherRead2Min: {
      coreConcept: 'Hallucination: AI không tra cứu sự thật mà chỉ ghép chữ theo xác suất. Thiếu dữ liệu, nó sẽ sáng tác tin giả cực kỳ mượt mà.',
      pedagogicalKey: 'Quy tắc 5 KHÔNG là chiếc la bàn đạo đức bảo vệ học sinh trên không gian mạng và liêm chính học thuật.',
      commonMistake: 'Học sinh tin tưởng 100% mọi số liệu, trích dẫn, năm sinh tác giả do AI đưa ra.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Lời nói dối siêu tự tin của AI',
        purpose: 'Chiếu một câu trả lời bịa đặt ngớ ngẩn nhưng văn phong cực nghiêm túc của AI lên TV.',
        teacherScript: 'AI nói câu này với vẻ mặt hoàn toàn tự tin, số liệu dẫn chứng đàng hoàng. Ai không để ý sẽ bị lừa ngay lập tức!',
        contentBlocks: [
          {
            heading: 'Ví dụ ảo giác kinh điển',
            description: '"Nhà thơ Nguyễn Du đã sáng tác Truyện Kiều trên máy tính cơ học vào thế kỷ 20..." - AI tự tin khẳng định!'
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 18 phút',
        durationMinutes: 13,
        title: 'Giảng giải: Bản chất Hallucination & Quy tắc 5 KHÔNG',
        purpose: 'Giải thích cơ chế toán học phía sau sự bịa đặt và giới thiệu 5 điều cấm kỵ.',
        teacherScript: 'AI sợ bị coi là dốt, nên khi không biết chắc, nó sẽ cố gắng ghép các chữ nghe có vẻ hợp tai nhất!',
        contentBlocks: [
          {
            heading: 'Quy trình kiểm chứng 3 bước (C-O-D-E)',
            bulletPoints: [
              '1. Check Source (Hỏi nguồn): Luôn hỏi AI "Thông tin này trích từ cuốn sách hoặc tài liệu chính thức nào?".',
              '2. Original Crosscheck (Đối chiếu gốc): Tra lại thông tin đó trên SGK hoặc nguồn uy tín.',
              '3. Decide (Quyết định): Chỉ sử dụng khi có ít nhất 2 nguồn độc lập xác nhận.'
            ]
          },
          {
            heading: 'Bộ Quy tắc 5 KHÔNG',
            bulletPoints: [
              '🚫 1. KHÔNG nhập thông tin cá nhân riêng tư (mật khẩu, địa chỉ, ảnh nhạy cảm).',
              '🚫 2. KHÔNG tin 100% số liệu/trích dẫn nếu chưa kiểm chứng bằng SGK.',
              '🚫 3. KHÔNG copy nguyên văn bài luận của AI rồi nhận là của mình.',
              '🚫 4. KHÔNG dùng AI chế ảnh, bôi nhọ, bắt nạt bạn bè hay thầy cô.',
              '🚫 5. KHÔNG để AI quyết định thay ước mơ và suy nghĩ của bản thân.'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: Trò chơi "Thám tử AI vạch trần ảo giác"',
        purpose: 'Cho học sinh làm thám tử tìm ra 3 chi tiết bịa đặt trong đoạn văn lịch sử trên màn hình TV.',
        teacherScript: 'Đoạn văn này có 3 chi tiết bịa đặt tinh vi do AI sáng tác. Thầy/Cô mời các thám tử nhí tìm và ấn nút vạch trần!',
        contentBlocks: [
          {
            heading: 'Vụ án thám tử AI',
            description: 'Đoạn văn về sự kiện lịch sử/văn học có cài sẵn 3 bẫy lỗi sai (sai năm sự kiện, sai tác giả câu thơ, sai số liệu).'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Thảo luận đạo đức: Học hỏi vs Gian lận',
        purpose: 'Tranh luận về tình huống bạn điểm 9 văn AI vs bạn điểm 7 văn tự viết.',
        teacherScript: 'Sau 3 năm cấp ba, ai mới là người chiến thắng thực sự trong cuộc sống?',
        contentBlocks: [
          {
            heading: 'Tình huống tranh luận đạo đức',
            description: 'Bạn A dùng AI viết bài 1000 chữ đạt 9 điểm. Bạn B tự thức khuya viết bằng cảm xúc được 7 điểm. Ai chiến thắng?'
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Đồng thanh cam kết văn hóa dùng AI',
        purpose: 'Cả lớp đọc to Quy tắc 5 KHÔNG.',
        teacherScript: 'Cả lớp hãy nhìn lên màn hình và cùng đọc vang 5 điều không bao giờ được vi phạm!',
        contentBlocks: [
          {
            heading: 'Cam kết lớp học',
            description: 'Học sinh thời đại số: Dùng công nghệ văn minh, trung thực và có trách nhiệm.'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt ép AI dẫn nguồn và kiểm chứng',
        category: 'Tư duy phản biện',
        prompt: `Tôi cần thông tin chính xác về sự kiện: [Tên sự kiện].
YÊU CẦU BẮT BUỘC:
- Chỉ cung cấp những sự thật lịch sử đã được kiểm chứng trong Sách giáo khoa hoặc tài liệu chính thống.
- Với mỗi số liệu hoặc trích dẫn, hãy ghi rõ nguồn trích dẫn cụ thể.
- Nếu bạn không chắc chắn 100% về thông tin nào, hãy nói rõ 'Thông tin này chưa được xác thực' thay vì tự suy đoán.`,
        explanation: 'Khóa chặt hiện tượng bốc phét bịa đặt của mô hình ngôn ngữ lớn.'
      }
    ],
    interactiveType: 'hallucination-detect'
  },
  {
    id: 6,
    title: 'Tiết 6: AI hỗ trợ môn Ngữ văn & Khoa học Xã hội (Văn, Sử, Địa)',
    shortTitle: 'Tiết 6: Trợ thủ Ngữ văn & KHXH',
    subtitle: 'Khai phá góc nhìn đa chiều & Đối thoại sống động cùng nhân vật lịch sử, văn học',
    coreObjective: 'Dùng AI để kích hoạt ý tưởng, lập dàn ý 3 tầng và nhập vai nhân vật mà không sao chép nguyên văn lời văn AI.',
    teacherRead2Min: {
      coreConcept: 'Văn phong AI thường sáo rỗng, hoa mỹ giả tạo. Chỉ dùng AI để brainstorm ý tưởng và góc nhìn đa chiều.',
      pedagogicalKey: 'Phương pháp Nhập vai nhân vật (Roleplay) giúp học sinh hiểu sâu tâm lý tác phẩm hơn đọc vẹt sách mẫu 10 lần.',
      commonMistake: 'Học sinh copy bài văn nguyên mẫu của AI nộp bài khiến bài viết vô hồn, giáo viên phát hiện ngay.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Nỗi sợ bí ý tưởng khi viết bài nghị luận',
        purpose: 'Đồng cảm với khó khăn lớn nhất của học sinh khi viết văn xã hội.',
        teacherScript: 'Đứng trước đề văn: Ý nghĩa của sự thất bại, bao nhiêu bạn thấy đầu óc trống rỗng không biết viết gì ngoài 1-2 ý quen thuộc?',
        contentBlocks: [
          {
            heading: 'Bế tắc thường gặp',
            bulletPoints: [
              'Chỉ nghĩ được 1 góc nhìn phiến diện.',
              'Thiếu dẫn chứng thực tế mang hơi thở thời đại.',
              'Mở bài theo lối mòn sáo rỗng.'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 17 phút',
        durationMinutes: 12,
        title: 'Giảng giải: Kính vạn hoa ý tưởng & Nhập vai nhân vật',
        purpose: 'Hướng dẫn 2 kỹ thuật mở khóa tư duy xã hội.',
        teacherScript: 'Biến AI thành chiếc kính vạn hoa để nhìn một đề văn dưới 4 lăng kính khác nhau chỉ trong 30 giây!',
        contentBlocks: [
          {
            heading: '2 Kỹ thuật thực chiến môn Văn & KHXH',
            bulletPoints: [
              'Kỹ thuật 1: Động não góc nhìn đa chiều (Cá nhân - Gia đình - Nhà trường - Công nghệ).',
              'Kỹ thuật 2: Nhập vai nhân vật (Hóa thân thành Lão Hạc, người lính Điện Biên Phủ để phỏng vấn trực tiếp).'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: "Phỏng vấn nhân vật Lão Hạc / Người lính Điện Biên Phủ"',
        purpose: 'Trình diễn cuộc đối thoại giàu cảm xúc trên TV lớp học.',
        teacherScript: 'Cả lớp hãy đóng vai một người hàng xóm sang thăm Lão Hạc sau ngày bác bán cậu Vàng!',
        contentBlocks: [
          {
            heading: 'Mô phỏng đối thoại văn học',
            description: 'Tương tác trực tiếp trên màn hình chiếu: Đặt câu hỏi và lắng nghe tâm sự xót xa của nhân vật.'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Đánh giá: Thổi hồn vào bài viết cá nhân',
        purpose: 'Rút ra bài học cách biến ý tưởng AI thành câu chữ của chính mình.',
        teacherScript: 'Ý tưởng là của AI gợi mở, nhưng xúc cảm và ngòi bút phải là của chính các em!',
        contentBlocks: [
          {
            heading: 'Nguyên tắc 3 KHÔNG môn Văn',
            bulletPoints: [
              'Không nhờ AI viết hộ cả bài.',
              'Không copy nguyên văn từ ngữ sáo rỗng của AI.',
              'Không để AI quyết định cảm xúc chân thật của trái tim mình.'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Tổng kết & Bài tập ứng dụng',
        purpose: 'Áp dụng cho bài kiểm tra Văn sắp tới.',
        teacherScript: 'Lần tới viết văn, hãy nhờ AI lập dàn ý 4 góc nhìn trước khi đặt bút viết nhé!',
        contentBlocks: [
          {
            heading: 'Ghi nhớ',
            description: 'Dàn ý vững chãi + Cảm xúc chân thành = Bài văn điểm cao.'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt Động não 4 góc nhìn đa chiều',
        category: 'Ngữ văn',
        prompt: `Tôi đang chuẩn bị viết bài văn nghị luận xã hội về chủ đề: "[Điền chủ đề, ví dụ: Áp lực đồng trang lứa - Peer pressure]".
ĐỪNG VIẾT BÀI VĂN HOÀN CHỈNH.
Hãy giúp tôi:
1. Gợi ý 4 góc nhìn khác nhau về vấn đề này (Góc độ cá nhân học sinh, góc độ phụ huynh, góc độ mạng xã hội và góc độ phát triển bản thân).
2. Đưa ra 2 dẫn chứng thực tế tiêu biểu ngoài đời sống.
3. Gợi ý 2 phản đề (phản biện ngược lại quan điểm số đông) để bài viết có chiều sâu tư duy.`,
        explanation: 'Khai phóng góc nhìn đa chiều cho học sinh lớp 10, 11, 12.'
      },
      {
        title: 'Prompt Nhập vai nhân vật Lão Hạc',
        category: 'Văn học',
        prompt: `Bạn hãy đóng vai nhân vật Lão Hạc trong truyện ngắn cùng tên của nhà văn Nam Cao.
Hãy trả lời tôi bằng đúng giọng điệu nghèo khổ, xót xa, thương con tha thiết và ân hận tột cùng khi vừa bán con chó Vàng.
Tôi sẽ đóng vai một người hàng xóm sang chơi và hỏi thăm bác.
Hãy bắt đầu bằng một câu chào và nghẹn ngào tâm sự việc bác vừa bán cậu Vàng.`,
        explanation: 'Khơi gợi xúc cảm văn học chân thực.'
      }
    ],
    interactiveType: 'roleplay-lit'
  },
  {
    id: 7,
    title: 'Tiết 7: AI – Gia sư Ngoại ngữ (Tiếng Anh) 24/7',
    shortTitle: 'Tiết 7: Gia sư Tiếng Anh',
    subtitle: 'Chẩn đoán lỗi sai (Writing Clinic) & Luyện đối thoại tình huống không sợ phán xét',
    coreObjective: 'Biến AI thành huấn luyện viên chữa bài viết tiếng Anh tỉ mỉ và bạn đồng hành luyện hội thoại tự nhiên.',
    teacherRead2Min: {
      coreConcept: 'Học sinh rất ngại nói hoặc viết tiếng Anh vì sợ sai bị bạn cười. AI là đối tượng không phán xét lý tưởng.',
      pedagogicalKey: 'Phải đọc phần GIẢI THÍCH LỖI SAI (tại sao sai ngữ pháp/từ vựng) thay vì chỉ nhìn vào phiên bản đã sửa.',
      commonMistake: 'Học sinh chỉ dùng Google Dịch từ tiếng Việt sang tiếng Anh mà không học được collocations tự nhiên.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Nỗi sợ bị chấm bài viết tiếng Anh',
        purpose: 'Tạo tâm lý an tâm, giải tỏa áp lực sợ sai cho học sinh.',
        teacherScript: 'Bao nhiêu bạn ở đây từng viết xong một đoạn văn tiếng Anh rồi cất luôn vào cặp vì sợ sai toe toét ngữ pháp?',
        contentBlocks: [
          {
            heading: 'Rào cản học ngoại ngữ',
            bulletPoints: [
              'Sợ bị chê cười khi phát âm hoặc viết sai ngữ pháp.',
              'Thầy cô trên lớp không thể sửa chi tiết từng bài viết của 45 học sinh.',
              'Thiếu môi trường giao tiếp thực tế với người bản xứ.'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 17 phút',
        durationMinutes: 12,
        title: 'Giảng giải: Bác sĩ sửa bài & Đối thoại tình huống',
        purpose: 'Giới thiệu mô hình Writing Clinic và Roleplay giao tiếp.',
        teacherScript: 'AI là gia sư kiên nhẫn nhất thế giới, sẵn sàng giải thích 10 lần tại sao câu này dùng in mà không dùng on!',
        contentBlocks: [
          {
            heading: '2 Năng lực bứt phá tiếng Anh cùng AI',
            bulletPoints: [
              '1. Bác sĩ sửa bài viết (Writing Clinic): Chỉ ra lỗi ngữ pháp, giải thích lý do bằng tiếng Việt, nâng cấp từ vựng xịn (Collocations).',
              '2. Đóng vai đối thoại (Roleplay): Giả lập tình huống gọi món ở quán cà phê London, phỏng vấn xin học bổng.'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: Hoạt động "Bác sĩ sửa bài viết"',
        purpose: 'Chữa trực tiếp một câu học sinh hay viết sai ngữ pháp trên TV lớp học.',
        teacherScript: 'Hãy nhìn câu này: "I very like play football because it make me health". Hãy xem AI chẩn đoán bệnh cho câu này thế nào!',
        contentBlocks: [
          {
            heading: 'Khám bệnh cho câu tiếng Anh',
            description: 'Phân tích lỗi sai: "very like" -> "really like", "make me health" -> "keeps me healthy" kèm giải thích ngữ pháp.'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Đánh giá: Học từ lỗi sai thay vì copy máy móc',
        purpose: 'Khắc sâu phương pháp học từ lỗi của chính mình.',
        teacherScript: 'Đọc kỹ phần giải thích nguyên nhân sai, đó mới chính là kiến thức giúp các em bứt phá điểm thi!',
        contentBlocks: [
          {
            heading: 'Bí kíp học tiếng Anh thời đại AI',
            bulletPoints: [
              'Ghi lại các cụm từ collocations tự nhiên vào sổ tay.',
              'Tự viết lại câu hoàn chỉnh bằng chính bàn tay mình sau khi được sửa.'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Tổng kết & Thử thách 5 phút mỗi tối',
        purpose: 'Tạo thói quen chat tiếng Anh trước khi ngủ.',
        teacherScript: 'Mỗi tối trước khi đi ngủ, hãy mở máy chat tiếng Anh với AI đúng 5 phút!',
        contentBlocks: [
          {
            heading: 'Thử thách 7 ngày',
            description: 'Duy trì trò chuyện tiếng Anh 5 phút mỗi ngày cùng AI.'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt Bác sĩ sửa bài viết tiếng Anh (Writing Clinic)',
        category: 'Tiếng Anh',
        prompt: `Bạn là một giáo viên dạy tiếng Anh bản xứ giàu kinh nghiệm và thấu hiểu học sinh Việt Nam.
Hãy đọc đoạn văn tiếng Anh dưới đây của tôi:
"[Dán đoạn văn tiếng Anh vào đây]"

Hãy giúp tôi theo cấu trúc 3 phần rõ ràng:
1. BẢNG BẮT BỆNH: Chỉ ra các lỗi sai ngữ pháp, lỗi dùng từ và giải thích bằng tiếng Việt tại sao sai.
2. PHIÊN BẢN CHUẨN TỰ NHIÊN: Viết lại đoạn văn sao cho mượt mà, chuẩn văn phong người bản xứ nhưng vẫn giữ nguyên ý tưởng của tôi.
3. GỢI Ý NÂNG CẤP (UPGRADE): Đề xuất 3 từ vựng hoặc cụm từ (Collocations/Idioms) nâng cao hơn để biến bài viết thành ấn tượng.`,
        explanation: 'Prompt sửa bài chi tiết nhất dành cho học sinh THPT.'
      },
      {
        title: 'Prompt Đóng vai nhân viên phục vụ tại London',
        category: 'Tiếng Anh Giao tiếp',
        prompt: `Hãy đóng vai một nhân viên phục vụ tại quán cà phê ở London. Tôi là du khách Việt Nam bước vào gọi món.
Hãy chào tôi và bắt đầu cuộc trò chuyện.
Yêu cầu:
- Dùng tiếng Anh tự nhiên, thân thiện.
- Sau mỗi câu trả lời của tôi, nếu tôi viết sai ngữ pháp, hãy sửa nhẹ nhàng ở đầu tin nhắn bằng tiếng Việt, sau đó tiếp tục cuộc hội thoại bằng tiếng Anh.`,
        explanation: 'Môi trường luyện giao tiếp an toàn, sửa lỗi tức thì.'
      }
    ],
    interactiveType: 'writing-clinic'
  },
  {
    id: 8,
    title: 'Tiết 8: AI trợ thủ môn Tự nhiên & Tự tạo đề ôn thi siêu tốc',
    shortTitle: 'Tiết 8: Trợ thủ môn Tự nhiên & Tạo đề thi',
    subtitle: 'Kỹ thuật Feynman giải thích trực quan & Máy sinh đề trắc nghiệm Active Recall',
    coreObjective: 'Hiểu các định luật Toán - Lý - Hóa bằng ẩn dụ đời thường và tự động tạo đề thi trắc nghiệm thách đố bạn bè.',
    teacherRead2Min: {
      coreConcept: 'Kỹ thuật Feynman: Nếu bạn không thể giải thích một khái niệm cho học sinh lớp 5 hiểu, nghĩa là bạn chưa thực sự hiểu nó.',
      pedagogicalKey: 'Active Recall (Chủ động nhớ lại qua bài kiểm tra): Tự làm đề thi thử nhớ bài lâu hơn đọc thuộc lòng gấp 5 lần.',
      commonMistake: 'Học sinh chỉ đọc đi đọc lại sách giáo khoa một cách thụ động trước ngày thi.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Nỗi ám ảnh "Học công thức trước quên sau"',
        purpose: 'Chạm đúng nỗi đau học vẹt công thức Toán Lý Hóa.',
        teacherScript: 'Đã bao giờ các em đọc thuộc lòng định luật Ôm hay công thức Hóa học 10 lần nhưng khi làm bài thi vẫn quên sạch chưa?',
        contentBlocks: [
          {
            heading: 'Vấn đề học vẹt môn Tự nhiên',
            bulletPoints: [
              'Nhớ máy móc ký hiệu nhưng không hiểu bản chất hiện tượng vật lý.',
              'Không biết công thức áp dụng vào đời sống thực tế thế nào.',
              'Học thuộc thụ động (Passive reading) rất dễ quên sau 24 giờ.'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 17 phút',
        durationMinutes: 12,
        title: 'Giảng giải: Kỹ thuật Feynman & Máy sinh đề thi',
        purpose: 'Hướng dẫn 2 kỹ thuật học tập chủ động.',
        teacherScript: 'Ép AI phải giải thích hiện tượng cộng hưởng điện hay đạo hàm bằng hình ảnh dễ hiểu như một quả bóng hay dòng nước!',
        contentBlocks: [
          {
            heading: '2 Công cụ học tập chủ động',
            bulletPoints: [
              '1. Ẩn dụ hóa Feynman: Giải thích khái niệm khoa học khó bằng câu chuyện đời thường.',
              '2. Máy tạo đề thi tự luyện (Quiz Generator): Tạo ngay 5 câu trắc nghiệm theo 3 mức độ (Nhận biết - Thông hiểu - Vận dụng).'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: Thử thách giải đề thi trắc nghiệm trên TV',
        purpose: 'Chiếu 5 câu trắc nghiệm thách đố cả lớp cùng suy nghĩ và bấm mở đáp án.',
        teacherScript: 'Cả lớp hãy cùng nhìn lên màn hình và giải nhanh câu hỏi trắc nghiệm này trong 1 phút!',
        contentBlocks: [
          {
            heading: 'Bộ đề ôn thi trắc nghiệm tương tác',
            description: 'Hiển thị các câu hỏi trắc nghiệm Toán - Lý - Hóa, học sinh trả lời, giáo viên bấm nút lật mở đáp án và giải thích.'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Đúc kết: Phương pháp ôn thi Active Recall',
        purpose: 'Khẳng định giá trị của việc tự kiểm tra kiến thức trước kỳ thi.',
        teacherScript: 'Cách ôn thi thông minh nhất là ép não mình phải trả lời câu hỏi, chứ không phải ngồi đọc lại sách!',
        contentBlocks: [
          {
            heading: 'Quy trình ôn thi siêu tốc',
            bulletPoints: [
              'Bước 1: Tóm tắt bài học thành 5 ý chính.',
              'Bước 2: Yêu cầu AI sinh 10 câu trắc nghiệm giấu đáp án.',
              'Bước 3: Tự làm bấm giờ và chỉ xem đáp án ở bước cuối cùng.'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Tổng kết & Lưu công thức tạo đề',
        purpose: 'Trang bị công cụ tự ôn thi trước kỳ thi học kỳ.',
        teacherScript: 'Hãy lưu câu lệnh tạo đề này để ôn thi giữa kỳ và cuối kỳ nhé cả lớp!',
        contentBlocks: [
          {
            heading: 'Hành trang mùa thi',
            description: 'Tự tạo bộ câu hỏi trắc nghiệm mỗi tối để làm chủ kiến thức.'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt Giải thích khái niệm theo Kỹ thuật Feynman',
        category: 'Khoa học Tự nhiên',
        prompt: `Bạn là một giáo sư [Toán/Vật lý/Hóa học/Sinh học] tài ba nhưng có lối diễn đạt cực kỳ hóm hỉnh và bình dân.
Hãy giải thích khái niệm: "[Điền khái niệm khó, ví dụ: 'Hiện tượng cộng hưởng điện' hoặc 'Khái niệm Đạo hàm']" cho một học sinh mới bắt đầu học.
Yêu cầu bắt buộc:
1. Phải sử dụng 01 ví dụ so sánh/ẩn dụ sinh động từ đời sống hàng ngày (như xích đu, dòng nước, chiếc xe đạp...).
2. Tuyệt đối không dùng công thức toán học phức tạp trong 3 câu đầu tiên.
3. Kết thúc bằng 1 câu tóm gọn bản chất dễ nhớ nhất để tôi không bao giờ quên.`,
        explanation: 'Giúp học sinh thấu hiểu bản chất vật lý/toán học.'
      },
      {
        title: 'Prompt Máy tạo đề thi trắc nghiệm (Active Recall)',
        category: 'Tự luyện thi',
        prompt: `Bạn là chuyên gia ra đề thi THPT môn [Tên môn học].
Hãy tạo cho tôi 05 câu hỏi trắc nghiệm 4 lựa chọn (A, B, C, D) về chủ đề: "[Tên bài học trong SGK]".
Phân bổ độ khó:
- 2 câu Mức độ Nhận biết
- 2 câu Mức độ Thông hiểu
- 1 câu Mức độ Vận dụng thực tế
LƯU Ý CỰC KỲ QUAN TRỌNG: Hãy giấu toàn bộ đáp án và lời giải chi tiết ở phần dưới cùng để tôi tự làm trước khi đối chiếu!`,
        explanation: 'Công cụ ôn thi chủ động hiệu quả nhất.'
      }
    ],
    interactiveType: 'quiz-generator'
  },
  {
    id: 9,
    title: 'Tiết 9: Sáng tạo Đa phương tiện & Kịch bản Thuyết trình (Slide)',
    shortTitle: 'Tiết 9: Slide & Đa phương tiện',
    subtitle: 'Nắm vững 6 yếu tố Prompt hình ảnh & Nguyên tắc thiết kế slide "Ít chữ - Nhiều ý"',
    coreObjective: 'Lên kịch bản 5 slide thuyết trình cô đọng, biết mô tả prompt tạo ảnh trực quan và xóa bỏ thói quen nhồi chữ kín slide.',
    teacherRead2Min: {
      coreConcept: 'Slide là để người nghe nhìn, không phải để người nói đọc. Khán giả đọc slide sẽ không còn lắng nghe người thuyết trình.',
      pedagogicalKey: 'Dạy tư duy mô tả hình ảnh 6 yếu tố: Chủ thể, Bối cảnh, Hành động, Phong cách, Màu sắc, Bố cục.',
      commonMistake: 'Học sinh copy nguyên cả đoạn văn 200 chữ nhồi đặc vào slide rồi đứng đọc từng chữ.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Chiếu 2 slide đối lập trên TV',
        purpose: 'Trực quan hóa sự khác biệt giữa slide thảm họa và slide chuyên nghiệp.',
        teacherScript: 'Nếu là khán giả ngồi dưới lớp, các em thích nhìn vào slide rừng chữ bên trái hay slide cô đọng bên phải?',
        contentBlocks: [
          {
            heading: 'Đối chiếu 2 phong cách slide',
            bulletPoints: [
              'Slide Rừng chữ: Nhét 200 chữ, người nghe mỏi mắt, không ai nhớ thông điệp.',
              'Slide Ít chữ - Nhiều ý: Đúng 3 gạch đầu dòng, số liệu to rõ, hình ảnh minh họa đắt giá.'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 17 phút',
        durationMinutes: 12,
        title: 'Giảng giải: 6 Yếu tố Prompt ảnh & Dàn ý 5 slide',
        purpose: 'Trang bị công thức làm chủ truyền thông thị giác.',
        teacherScript: 'Muốn AI vẽ đúng bức tranh trong đầu các em, hãy mô tả đủ 6 mảnh ghép hình ảnh này!',
        contentBlocks: [
          {
            heading: 'Công thức 6 yếu tố mô tả hình ảnh',
            bulletPoints: [
              '1. Chủ thể (Subject): Ai, cái gì ở trung tâm?',
              '2. Bối cảnh (Setting): Không gian ở đâu?',
              '3. Hành động (Action): Đang làm gì?',
              '4. Phong cách (Style): 3D render, ảnh chụp, hoạt hình tối giản?',
              '5. Màu sắc (Color): Tươi sáng, ấm áp, tương phản?',
              '6. Bố cục (Composition): Góc cận cảnh, góc rộng?'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: So sánh trực quan Slide trên màn hình TV',
        purpose: 'Trình chiếu mô phỏng trực quan slide so sánh.',
        teacherScript: 'Hãy nhìn vào kịch bản 5 slide về chủ đề Giảm rác thải nhựa tại căng-tin trường học!',
        contentBlocks: [
          {
            heading: 'Mô phỏng Slide thuyết trình',
            description: 'Xem cấu trúc slide: Tiêu đề ấn tượng, 3 gạch đầu dòng dưới 10 từ, mô tả ảnh minh họa và lời thoại Speaker Notes.'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Đánh giá: Tiêu chí bài thuyết trình thu hút',
        purpose: 'Đúc kết nguyên tắc thuyết trình tự tin.',
        teacherScript: 'Một bài thuyết trình hay là bài mà người nghe nhớ thông điệp của các em chứ không phải bài chiếu nhiều chữ nhất!',
        contentBlocks: [
          {
            heading: 'Tiêu chí vàng của một bài thuyết trình',
            bulletPoints: [
              'Mỗi slide chỉ truyền tải 1 thông điệp duy nhất.',
              'Mỗi gạch đầu dòng không quá 10 từ.',
              'Hình ảnh minh họa có ý nghĩa thực sự, không dùng ảnh stock trang trí rác.'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Tổng kết & Chuẩn bị kỹ năng',
        purpose: 'Sẵn sàng ứng dụng vào các môn học trên lớp.',
        teacherScript: 'Từ nay, slide thuyết trình của lớp mình sẽ luôn chuyên nghiệp và ấn tượng nhất trường!',
        contentBlocks: [
          {
            heading: 'Ghi nhớ',
            description: 'Slide là bệ phóng cho lời nói của bạn, đừng biến nó thành bức tường chữ.'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt Dàn ý 5 Slide thuyết trình chuẩn mực',
        category: 'Thuyết trình',
        prompt: `Bạn là một chuyên gia huấn luyện thuyết trình (Presentation Coach).
Hãy lên kịch bản nội dung cho bài thuyết trình gồm đúng 05 slide về chủ đề: "[Điền chủ đề, ví dụ: 'Tác hại của việc thức khuya đối với học sinh THPT']".
Yêu cầu nghiêm ngặt cho từng slide:
- Tiêu đề slide ngắn gọn, thu hút (dưới 8 từ).
- Tối đa 3 gạch đầu dòng nội dung (mỗi dòng TUYỆT ĐỐI không quá 10 từ, không viết thành câu dài).
- Gợi ý 01 ý tưởng hình ảnh minh họa trực quan (mô tả rõ chủ thể và phong cách).
- Lời dẫn gợi ý cho người nói (Speaker Notes) súc tích dưới 50 từ.`,
        explanation: 'Khuôn mẫu slide chuẩn quốc tế ít chữ nhiều ý.'
      },
      {
        title: 'Prompt Mô tả hình ảnh 6 yếu tố cho AI tạo ảnh',
        category: 'Tạo ảnh',
        prompt: `Hãy viết cho tôi một câu lệnh (Prompt bằng tiếng Anh) để tạo ảnh minh họa bài học với đầy đủ 6 yếu tố:
- Chủ thể: Một nhóm học sinh THPT Việt Nam đang vui vẻ làm việc nhóm.
- Bối cảnh: Phòng học hiện đại, có bảng thông minh và ánh nắng sáng tự nhiên.
- Hành động: Đang chỉ tay vào máy tính bảng thảo luận sôi nổi.
- Phong cách: 3D Pixar render, màu sắc tươi sáng, thân thiện.
- Màu sắc: Tông màu xanh dương và cam ấm áp, tràn đầy năng lượng.
- Bố cục: Góc chụp rộng, chiều sâu trường ảnh rõ nét.`,
        explanation: 'Chuẩn công thức 6 yếu tố mô tả hình ảnh trực quan.'
      }
    ],
    interactiveType: 'slide-compare'
  },
  {
    id: 10,
    title: 'Tiết 10: AI & Hướng nghiệp tương lai – Học sinh cần chuẩn bị gì?',
    shortTitle: 'Tiết 10: Hướng nghiệp tương lai',
    subtitle: 'Bức tranh việc làm thời đại AI & Bộ 4 năng lực vàng con người vượt trội máy móc',
    coreObjective: 'Nhận thức sâu sắc: AI không thay thế con người, nhưng người biết dùng AI sẽ thay thế người không biết dùng.',
    teacherRead2Min: {
      coreConcept: 'Các công việc lặp đi lặp lại sẽ bị tự động hóa. Kỹ năng cảm xúc, thấu cảm, tư duy phản biện sẽ ngày càng đắt giá.',
      pedagogicalKey: 'Giúp học sinh tự tin bước vào tương lai, xóa bỏ tâm lý hoang mang sợ AI cướp mất nghề nghiệp.',
      commonMistake: 'Học sinh nghĩ rằng chỉ cần giỏi công nghệ là đủ, coi nhẹ các kỹ năng mềm và nhân tính.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Trắc nghiệm "Nghề này AI có làm thay được không?"',
        purpose: 'Khảo sát nhanh 4 nghề: Bác sĩ tâm lý, Nhập liệu, Giáo viên mầm non, Kế toán sao chép.',
        teacherScript: 'Trong 4 nghề này, nghề nào AI làm tốt hơn, nghề nào con người mãi mãi là số 1?',
        contentBlocks: [
          {
            heading: 'Khảo sát việc làm thời đại AI',
            bulletPoints: [
              'Nhập liệu, tính toán sao chép: AI làm nhanh gấp 1000 lần và không bao giờ mệt mỏi.',
              'Bác sĩ tâm lý, Giáo viên mầm non: Cần tình yêu thương, ánh mắt và sự thấu cảm - thứ AI vĩnh viễn không thể có!'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 17 phút',
        durationMinutes: 12,
        title: 'Giảng giải: Bộ 4 năng lực vàng bất khả xâm phạm',
        purpose: 'Định hình 4 trụ cột học sinh cần rèn luyện ngay từ ghế nhà trường.',
        teacherScript: 'Đây là 4 thứ vũ khí tối thượng giúp các em luôn dẫn đầu trong mọi thị trường lao động tương lai!',
        contentBlocks: [
          {
            heading: 'Bản đồ 4 năng lực vàng của con người',
            bulletPoints: [
              '1. 🧠 TƯ DUY PHẢN BIỆN (Critical Thinking): Biết hoài nghi, phân biệt đúng sai, không bị tin giả dắt mũi.',
              '2. ❤️ SỰ THẤU CẢM & GIAO TIẾP (Empathy): Biết lắng nghe, kết nối trái tim và thấu hiểu con người.',
              '3. 🎨 SÁNG TẠO ĐỘC BẢN (Original Creativity): Tạo ra giá trị mới dựa trên trải nghiệm sống thực tế.',
              '4. 🚀 LÀM CHỦ CÔNG NGHỆ (AI Literacy): Biết điều khiển AI phục vụ mục tiêu của bản thân.'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: Khám phá nghề nghiệp mơ ước cùng Cố vấn AI',
        purpose: 'Trình diễn phân tích một ngành nghề tương lai (Thiết kế đồ họa / Y đa khoa) trên TV.',
        teacherScript: 'Cả lớp hãy chọn 1 ngành nghề các em đang ấp ủ, chúng ta cùng xem AI phân tích cơ hội và thách thức của ngành đó!',
        contentBlocks: [
          {
            heading: 'Phân tích ngành nghề thời kỳ AI',
            description: 'AI tự động hóa phần nào? Kỹ năng con người nào không thể thay thế? 3 việc cần rèn luyện ngay từ cấp ba.'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Chia sẻ & Truyền cảm hứng',
        purpose: 'Lắng nghe ước mơ và định hướng của học sinh.',
        teacherScript: 'Tương lai không thuộc về người giỏi máy móc hơn máy móc, mà thuộc về người có nhân tính sâu sắc nhất kết hợp với khả năng làm chủ máy móc!',
        contentBlocks: [
          {
            heading: 'Thông điệp truyền cảm hứng',
            description: 'Hãy là người cầm lái công nghệ, xây dựng tương lai bằng trái tim nhân văn.'
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Tổng kết & Lập kế hoạch 6 tháng',
        purpose: 'Chuyển hóa nhận thức thành hành động cụ thể.',
        teacherScript: 'Viết ra 3 kỹ năng mềm em sẽ rèn luyện ngay trong học kỳ này!',
        contentBlocks: [
          {
            heading: 'Kế hoạch hành động cá nhân',
            description: 'Rèn luyện tư duy phản biện, kỹ năng giao tiếp và khả năng ứng dụng công nghệ.'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt Cố vấn Hướng nghiệp thời đại AI',
        category: 'Hướng nghiệp',
        prompt: `Bạn là chuyên gia tư vấn hướng nghiệp và tuyển sinh đại học hàng đầu.
Tôi là học sinh THPT đang rất quan tâm đến ngành nghề: "[Điền tên ngành, ví dụ: 'Ngành Thiết kế Đồ họa' hoặc 'Ngành Y Đa khoa']".
Hãy phân tích giúp tôi:
1. Trong 5-10 năm tới, AI sẽ hỗ trợ và tự động hóa những khâu công việc nào trong ngành này?
2. Những kỹ năng cốt lõi nào của CON NGƯỜI mà AI vĩnh viễn không thể thay thế trong ngành này?
3. Ngay từ khi còn ngồi trên ghế trường THPT, tôi cần trau dồi 03 kỹ năng hoặc kiến thức gì để có lợi thế cạnh tranh vượt trội?
4. Đề xuất cho tôi 01 kế hoạch hành động cụ thể trong 6 tháng tới.
Trình bày truyền cảm hứng, thực tế và rõ ràng.`,
        explanation: 'Prompt định hướng nghề nghiệp sắc sảo và cá nhân hóa.'
      }
    ],
    interactiveType: 'career-map'
  },
  {
    id: 11,
    title: 'Tiết 11: Sử dụng Agent IDE & Nạp Tài Liệu Làm Context Cho AI',
    shortTitle: 'Tiết 11: Agent IDE & Tài liệu Context',
    subtitle: 'Hướng dẫn tải tài liệu học tập (PDF, Word, Markdown) lên Agent IDE để biến tài liệu thành bộ nhớ ngữ cảnh (Context) chuẩn xác cho AI',
    coreObjective: 'Hiểu bản chất Context (Ngữ cảnh) và biết sử dụng các Agent IDE hiện đại để tải tài liệu môn học lên, giúp AI trả lời bám sát 100% đề cương mà không bị ảo giác.',
    teacherRead2Min: {
      coreConcept: 'Khi hỏi AI thông thường, AI lấy kiến thức chung trên mạng nên dễ trả lời lan man. Khi tải tài liệu vào Agent IDE làm Context, AI chỉ đọc và trích xuất đúng từ tài liệu đó.',
      pedagogicalKey: 'Hướng dẫn học sinh quy trình 3 bước: Gom tài liệu vào Workspace -> Tải lên / Đính kèm bằng ký hiệu @file -> Ra lệnh cho AI xử lý dựa trên tài liệu.',
      commonMistake: 'Học sinh tải file ảnh chụp mờ hoặc đặt tên file vô nghĩa (vd: 123.pdf) làm Agent khó định vị đúng nội dung.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Vì sao hỏi AI bình thường hay bị lệch đề cương của Thầy/Cô?',
        purpose: 'Chỉ ra hạn chế của việc hỏi AI không kèm tài liệu gốc.',
        teacherScript: 'Nếu các em hỏi ChatGPT về đề cương ôn thi Học kỳ I riêng của trường THPT Trung Phú, vì sao AI lại trả lời chung chung hoặc đoán mò?',
        contentBlocks: [
          {
            heading: 'Hỏi AI thông thường vs. Hỏi AI có nạp Tài liệu (Context)',
            bulletPoints: [
              'Hỏi AI trống không (Zero-Context): AI lục tìm kiến thức đại trà trên Internet, trả lời dài dòng và lệch trọng tâm bài giảng trên lớp.',
              'Nạp tài liệu làm Context (Grounded Context): Tải trực tiếp file đề cương, ghi chú bài học lên để AI lấy đó làm nguồn tri thức duy nhất khi trả lời.'
            ],
            callout: {
              type: 'tip',
              text: 'Context (Ngữ cảnh) chính là "sách giáo khoa mở sẵn" mà bạn đặt trước mặt AI trước khi yêu cầu AI làm việc!'
            }
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 17 phút',
        durationMinutes: 12,
        title: 'Khám phá: Agent IDE là gì & Quy trình 3 bước nạp Tài liệu làm Context',
        purpose: 'Hướng dẫn thao tác sử dụng không gian làm việc của Agent IDE (Antigravity, Cursor, NotebookLM).',
        teacherScript: 'Khác với khung chat đơn thuần, các Agent IDE cho phép chúng ta mở cả một thư mục tài liệu để AI đọc hiểu toàn bộ các file bên trong!',
        contentBlocks: [
          {
            heading: 'Quy trình 3 bước biến Tài liệu thành Context trong Agent IDE',
            bulletPoints: [
              'Bước 1 — Đưa tài liệu vào Workspace: Mở thư mục chứa tài liệu học tập (.pdf, .docx, .md, .txt) hoặc kéo thả file vào bảng Explorer của Agent IDE.',
              'Bước 2 — Gắn thẻ tham chiếu (@Mention): Trong ô nhập câu lệnh, gõ ký hiệu "@" kèm tên file (ví dụ: @De_Cuong_Sinh_Hoc.pdf) để chỉ định rõ tài liệu làm Context.',
              'Bước 3 — Ra lệnh bám sát nguồn: Yêu cầu Agent tóm tắt, lập sơ đồ tư duy hoặc tạo câu hỏi trắc nghiệm CHỈ dựa trên nội dung file đã đính kèm.'
            ],
            callout: {
              type: 'info',
              text: 'Các công cụ tiêu biểu hỗ trợ nạp tài liệu Context cực mạnh: Google Antigravity, Cursor IDE, Windsurf và Google NotebookLM.'
            }
          }
        ]
      },
      {
        id: 's3',
        timeRange: '17 - 35 phút',
        durationMinutes: 18,
        title: 'Thực hành tại lớp: Mô phỏng nạp Tài liệu vào Agent IDE & Truy vấn Context',
        purpose: 'Học sinh trực tiếp thao tác nạp file vào Workspace và so sánh câu trả lời của AI.',
        teacherScript: 'Bây giờ chúng ta sẽ thử nghiệm trực tiếp trên màn hình: Hãy thử hỏi Agent khi CHƯA nạp file đề cương và sau khi ĐÃ nạp file làm Context!',
        contentBlocks: [
          {
            heading: 'Phòng Lab Thực hành: Agent IDE Context Workspace',
            description: 'Chọn từng tài liệu học tập bên dưới, bấm "+ Nạp Context" để đính kèm file (@file) và gửi câu lệnh để kiểm chứng độ chính xác.'
          }
        ]
      },
      {
        id: 's4',
        timeRange: '35 - 42 phút',
        durationMinutes: 7,
        title: 'Bí quyết chuẩn bị Tài liệu "Sạch" để AI đọc hiểu tốt nhất',
        purpose: 'Trang bị kỹ năng tổ chức file và dữ liệu cá nhân cho học sinh.',
        teacherScript: 'Muốn Agent đọc tài liệu nhanh và không bỏ sót ý nào, các em cần lưu ý 3 mẹo nhỏ khi chuẩn bị file!',
        contentBlocks: [
          {
            heading: '3 Nguyên tắc vàng khi tải tài liệu làm Context',
            bulletPoints: [
              '1. Đặt tên file rõ nghĩa, không dấu hoặc gạch nối (VD: Chuong1_DiTruyenHoc_Sinh12.pdf thay vì TaiLieu1.pdf).',
              '2. Ưu tiên định dạng văn bản thuần hoặc có cấu trúc rõ ràng (.md, .docx, .txt, .pdf xuất từ máy tính) thay vì ảnh chụp nghiêng ngả, mờ nhòe.',
              '3. Chia nhỏ tài liệu theo từng chương hoặc chủ đề để khi gắn thẻ @file, AI tập trung đúng vùng kiến thức cần tra cứu.'
            ]
          }
        ]
      },
      {
        id: 's5',
        timeRange: '42 - 45 phút',
        durationMinutes: 3,
        title: 'Nhiệm vụ về nhà: Xây dựng "Kho Context Môn Học" cá nhân',
        purpose: 'Ứng dụng ngay vào ôn tập học kỳ và chuẩn bị cho báo cáo Tiết 12.',
        teacherScript: 'Về nhà, mỗi nhóm hãy gom các tài liệu ôn tập của mình vào 1 thư mục Workspace sạch sẽ để chuẩn bị cho buổi báo cáo tổng kết ở Tiết 12 nhé!',
        contentBlocks: [
          {
            heading: 'Thực hành tại nhà',
            description: 'Tạo 1 thư mục tài liệu môn học (Sinh học, Ngữ văn, Lịch sử...), tải lên Agent IDE / NotebookLM và tạo 1 bản tóm tắt ôn thi có trích dẫn trang rõ ràng.'
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Prompt Khai thác Tài liệu Context chống Ảo giác 100%',
        category: 'Agent IDE / Context',
        prompt: `Hãy đọc kỹ tài liệu @[Tên_File_Tài_Liệu] mà tôi đã tải lên trong Workspace làm ngữ cảnh (Context) duy nhất.
Nhiệm vụ của bạn:
1. Tóm tắt 05 luận điểm / công thức quan trọng nhất có trong tài liệu này.
2. Với mỗi ý, hãy ghi rõ trích dẫn nằm ở mục nào hoặc trang nào trong file.
3. Quy tắc bắt buộc: CHỈ sử dụng thông tin có trong file @[Tên_File_Tài_Liệu], tuyệt đối không tự suy diễn thêm kiến thức bên ngoài. Nếu thông tin nào không có trong file, hãy trả lời rõ "Tài liệu không đề cập".`,
        explanation: 'Câu lệnh khóa chặt phạm vi trả lời của AI vào đúng tài liệu đã nạp, triệt tiêu hoàn toàn hiện tượng bịa đặt.'
      },
      {
        title: 'Prompt Tổng hợp & Tạo đề ôn tập từ nhiều File Context',
        category: 'Agent IDE / Ôn tập',
        prompt: `Tôi đã tải lên 2 tài liệu: @[File_Ly_Thuyet] và @[File_Bai_Tap_Mau] vào Context của dự án.
Hãy đối chiếu cả 2 tài liệu trên và giúp tôi:
1. Lập bảng hệ thống hóa các dạng bài tập trong @[File_Bai_Tap_Mau] tương ứng với từng phần lý thuyết trong @[File_Ly_Thuyet].
2. Thiết kế 05 câu hỏi trắc nghiệm mới bám sát đúng cấu trúc và mức độ khó của @[File_Bai_Tap_Mau], kèm lời giải chi tiết trích dẫn từ lý thuyết.`,
        explanation: 'Phát huy sức mạnh kết nối đa tài liệu (Multi-file Context) của các Agent IDE hiện đại.'
      }
    ],
    interactiveType: 'final-project-guide'
  },
  {
    id: 12,
    title: 'Tiết 12: Dự án Cuối khóa – Báo cáo & Tuyên ngôn "Học thông minh"',
    shortTitle: 'Tiết 12: Báo cáo & Tuyên ngôn',
    subtitle: 'Báo cáo 3 phút/nhóm, chấm điểm Rubric 100đ & Đồng thanh Tuyên ngôn "Học thông minh cùng AI"',
    coreObjective: 'Thuyết trình tự tin sản phẩm ứng dụng AI, phản biện văn minh và đúc kết bản Tuyên ngôn làm chủ công nghệ.',
    teacherRead2Min: {
      coreConcept: 'Đỉnh cao của khóa học: Tôn vinh nỗ lực của học sinh, trao quyền làm chủ tương lai cho các em.',
      pedagogicalKey: 'Giữ đúng kỷ luật thời gian: 3 phút báo cáo + 1 phút phản biện để cả 5-6 nhóm đều có cơ hội tỏa sáng.',
      commonMistake: 'Để các nhóm thuyết trình quá giờ làm cháy giáo án bế mạc.'
    },
    stages: [
      {
        id: 's1',
        timeRange: '00 - 05 phút',
        durationMinutes: 5,
        title: 'Khởi động: Phổ biến thể lệ báo cáo (3 phút/nhóm)',
        purpose: 'Bật đồng hồ đếm ngược 3 phút trên TV, nhắc quy tắc chuông reo.',
        teacherScript: 'Chào mừng cả lớp đến với Ngày hội Báo cáo Dự án AI Thực chiến! Mỗi nhóm có đúng 3 phút để thuyết trình và 1 phút phản biện.',
        contentBlocks: [
          {
            heading: 'Thể lệ thuyết trình 3 phút',
            bulletPoints: [
              'Phút 1: Nhóm chọn vấn đề gì và tại sao?',
              'Phút 2: Nhóm đã dùng những Prompt chuẩn R-T-C-C-F nào?',
              'Phút 3: Sản phẩm cuối cùng là gì? Đâu là phần AI làm, đâu là phần nhóm tự tay chỉnh sửa?'
            ]
          }
        ]
      },
      {
        id: 's2',
        timeRange: '05 - 32 phút',
        durationMinutes: 27,
        title: 'Vòng tròn Báo cáo Dự án & Chấm điểm Rubric',
        purpose: 'Các nhóm lần lượt lên báo cáo, giáo viên bấm giờ và chấm điểm trực tiếp trên màn hình.',
        teacherScript: 'Mời Nhóm 1 lên sân khấu! Đồng hồ 3 phút bắt đầu đếm ngược!',
        contentBlocks: [
          {
            heading: '5 Tiêu chí Rubric (Thang điểm 100)',
            bulletPoints: [
              '1. Kỹ năng Prompting chuẩn R-T-C-C-F: 25 điểm',
              '2. Chất lượng & Tính thực tiễn của sản phẩm: 30 điểm',
              '3. Tư duy phản biện & Kiểm chứng thông tin: 20 điểm',
              '4. Kỹ năng thuyết trình & Làm việc nhóm: 15 điểm',
              '5. Đạo đức & Trách nhiệm minh bạch AI: 10 điểm'
            ]
          }
        ]
      },
      {
        id: 's3',
        timeRange: '32 - 40 phút',
        durationMinutes: 8,
        title: 'Nhận xét tổng kết của Thầy/Cô & Vinh danh nhóm xuất sắc',
        purpose: 'Khen ngợi sự tiến bộ vượt bậc của toàn thể học sinh sau 12 tiết học.',
        teacherScript: 'Thầy/Cô thực sự tự hào về sự trưởng thành của các em từ một người chỉ biết hỏi AI vu vơ đến những người biết làm chủ công nghệ thực thụ!',
        contentBlocks: [
          {
            heading: 'Vinh danh & Trao giải',
            bulletPoints: [
              'Giải Prompt xuất sắc nhất.',
              'Giải Thám tử kiểm chứng thông tin cẩn thận nhất.',
              'Giải Sản phẩm học tập có tính ứng dụng cao nhất.'
            ]
          }
        ]
      },
      {
        id: 's4',
        timeRange: '40 - 45 phút',
        durationMinutes: 5,
        title: 'Đại lễ Bế mạc: Đồng thanh Tuyên ngôn "Học thông minh cùng AI"',
        purpose: 'Chiếu chữ to toàn màn hình, cả lớp đứng dậy đồng thanh đọc vang 3 điều tuyên ngôn, kích hoạt pháo hoa chúc mừng.',
        teacherScript: 'Mời toàn thể các em đứng dậy, đặt tay lên ngực và cùng đọc to Bản Tuyên ngôn của người học thời đại mới!',
        contentBlocks: [
          {
            heading: 'Bản Tuyên ngôn 3 Điều',
            bulletPoints: [
              '1. TÔI LÀ NGƯỜI CẦM LÁI: AI chỉ là trợ lý đắc lực, bộ não và tư duy của tôi mới là người quyết định cuối cùng!',
              '2. TÔI KHÔNG HỌC VẸT: Tôi không dùng AI để chép bài đối phó. Tôi dùng AI để hiểu sâu hơn, học nhanh hơn và sáng tạo nhiều hơn!',
              '3. TÔI CÓ TRÁCH NHIỆM: Tôi luôn kiểm chứng sự thật, bảo vệ thông tin cá nhân và sử dụng công nghệ vì những điều tử tế!'
            ]
          }
        ]
      }
    ],
    prompts: [
      {
        title: 'Bản Tuyên ngôn Người học Thời đại AI',
        category: 'Tuyên ngôn',
        prompt: `BẢN TUYÊN NGÔN "HỌC THÔNG MINH CÙNG AI"
1. TÔI LÀ NGƯỜI CẦM LÁI: AI chỉ là trợ lý, bộ não tôi quyết định cuối cùng!
2. TÔI KHÔNG HỌC VẸT: Tôi dùng AI để hiểu sâu, học nhanh và sáng tạo độc bản!
3. TÔI CÓ TRÁCH NHIỆM: Tôi luôn kiểm chứng sự thật, bảo mật dữ liệu và dùng công nghệ vì điều tử tế!`,
        explanation: 'Khắc sâu đạo đức và trách nhiệm công nghệ.'
      }
    ],
    interactiveType: 'rubric-proclamation'
  }
];

export const TOP_5_PROMPTS = [
  {
    id: 1,
    title: 'Ôn bài siêu tốc',
    tag: 'Tất cả các môn',
    prompt: 'Hãy tóm tắt bài học [Tên bài] môn [Tên môn] lớp [Lớp] thành 5 luận điểm chính kèm 1 bảng so sánh các điểm dễ nhầm lẫn nhất.'
  },
  {
    id: 2,
    title: 'Gia sư Socratic (Không cho chép đáp án)',
    tag: 'Toán - KHTN',
    prompt: 'Tôi đang làm bài tập này: [Dán bài]. Hãy đóng vai gia sư kiên nhẫn, KHÔNG cho đáp án, chỉ đặt từng câu hỏi gợi ý để tôi tự giải.'
  },
  {
    id: 3,
    title: 'Chữa bài viết tiếng Anh (Writing Clinic)',
    tag: 'Tiếng Anh',
    prompt: 'Hãy sửa lỗi ngữ pháp cho đoạn văn sau của tôi: [Dán đoạn văn]. Giải thích bằng tiếng Việt tại sao sai và gợi ý 3 cách diễn đạt tự nhiên hơn.'
  },
  {
    id: 4,
    title: 'Tìm ý tưởng viết văn nghị luận 4 chiều',
    tag: 'Ngữ văn - KHXH',
    prompt: 'Tôi đang làm đề văn: [Dán đề]. Đừng viết bài văn. Hãy gợi ý cho tôi 4 góc nhìn thực tế khác nhau và 2 tấm gương đời thực tiêu biểu để làm dẫn chứng.'
  },
  {
    id: 5,
    title: 'Tự tạo đề thi trắc nghiệm Active Recall',
    tag: 'Ôn thi cấp tốc',
    prompt: 'Hãy tạo 5 câu trắc nghiệm 4 lựa chọn về chủ đề [Tên chủ đề] SGK. Giấu đáp án ở cuối cùng để tôi tự làm thử trước khi đối chiếu.'
  }
];

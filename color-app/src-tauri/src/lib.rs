#[allow(unused_imports)]
use palette::{FromColor, Lch, Srgb,Gradient};



#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn generate_gradient(r:u8, g:u8, b:u8) -> Vec<Vec<u8>> {
    let my_rgb = Srgb::new(
        r as f32 / 255.0, 
        g as f32 / 255.0, 
        b as f32 / 255.0,
    );
    let my_lch:Lch = Lch::from_color(my_rgb.into_linear());
    let gradient = Gradient::new(vec![
        Lch::new(0.0, my_lch.chroma, my_lch.hue),
        my_lch,
        Lch::new(10.0, my_lch.chroma, my_lch.hue),
    ]);
  
    let colors = gradient
    .take(10)
    .map(|color| {
        let (r,g,b) = 
        Srgb::from_color(color).into_components();
        
       vec![ (r*255.0)as u8,
        (g*255.0)as u8,
        (b*255.0)as u8,
       ]
    })
    .collect::<Vec<_>>();
  
        dbg!(&colors);

   colors

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, generate_gradient])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

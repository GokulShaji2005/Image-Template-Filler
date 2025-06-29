"use client";
import styles from "../Landing.module.css";
import contentStyles from "./content.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft } from 'lucide-react'
import { useRouter } from "next/navigation";
import UploadCSV from "@/components/UploadCSV";


export default function ContentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
   const [isMobile, setIsmobile] = useState(false);
   const [isEdit,setIsEdit]=useState(false);
   const [inputvalue,setInputvalue]=useState("");
   const [Celledit,setCellEdit]=useState({row:null,column:null});
   const [confirmBtn,setconfirmBtn]=useState(false);
  const csvHeaders = ["Column 1", "Column 2", "Column 3"];


  const [data,setData]=useState([
    {Column1 :"Value A1", Column2 :"Value B1", Column3 :"Value C1"},
    {Column1 :"Value A2", Column2 :"Value B2", Column3 :"Value C2"},
    {Column1 :"Value A3", Column2 :"Value B3", Column3 :"Value C3"},
    {Column1 :"Value A4", Column2 :"Value B4", Column3 :"Value C4"},
    {Column1 :"Value A5", Column2 :"Value B5", Column3 :"Value C5"},
  ])
  const [editedData,setEditedData]=useState(JSON.parse(JSON.stringify(data)));
    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width:900px)');
      const moveEditBtn = () => setIsmobile(mediaQuery.matches);
  
      moveEditBtn();
      mediaQuery.addEventListener('change', moveEditBtn);
      return () => mediaQuery.removeEventListener('change', moveEditBtn);
  
    }, []);

    const router = useRouter();

    const cellClick=(rowidx,columnidx)=>{
      if(isEdit){
      setCellEdit({row:rowidx,column:columnidx})
      setInputvalue(data[rowidx][columnidx])
      }
    }

    const handleInput=(rowIdx,columnidx,newValue)=>{
    if(isEdit){
      const updatedValue=[...editedData];
      updatedValue[rowIdx][columnidx]=newValue;
      setEditedData(updatedValue);
      // setCellEdit({row:null,column:null})
    }}
const editMode=()=>{
  setEditedData(JSON.parse(JSON.stringify(data)));
  setIsEdit(true);
  setconfirmBtn(true)
}

const confirmation=()=>{
  setData(editedData)
  setIsEdit(false);
  setconfirmBtn(false)
  setCellEdit({row:null,column:null})
}

  return (
    <div className={styles.landing}>
      <header className={styles.navbar} style={{position:'relative'}}>
        <ArrowLeft className={contentStyles.arrowleft} size={30} onClick={()=>router.back()}/>
        <div className={styles.logoRow}>
          <img src="/logo_image.svg" alt="Logo" className={styles.logo} />
          <span className={styles.brand}>Image-Template-Filler</span>
        </div>
        <nav className={contentStyles.navLinks}>
          <a href="/" className={contentStyles.navLink}>Home</a>
          <a href="https://github.com/alvin-dennis/Image-Template-Filler" target="_blank" rel="noopener noreferrer" className={contentStyles.navLink}>Github</a>
        </nav>
        <button className={contentStyles.hamburger} aria-label="Open menu" onClick={()=>setMenuOpen(v=>!v)}>
          <span className={contentStyles.hamburgerBar}></span>
          <span className={contentStyles.hamburgerBar}></span>
          <span className={contentStyles.hamburgerBar}></span>
        </button>
        {menuOpen && <div className={contentStyles.menuOverlay + ' '+ contentStyles.show} onClick={()=>setMenuOpen(false)}></div>}
        {menuOpen && (
          <nav className={contentStyles.mobileNav + ' ' +contentStyles.show}>
            <a href="/" onClick={()=>setMenuOpen(false)}>Home</a>
            <a href="https://github.com/alvin-dennis/Image-Template-Filler" target="_blank" rel="noopener noreferrer" onClick={()=>setMenuOpen(false)}>Github</a>
          </nav>
        )}
      </header>
      <main className={contentStyles.mainContent}>
        <section className={contentStyles.csvSection}>
          <h2 className={contentStyles.sectionTitle}>Edit CSV Content</h2>
          <div className={contentStyles.tableWrapper}>
            <table className={contentStyles.csvTable}>
              <thead className={contentStyles.tableHead}>
                <tr>
                  {csvHeaders.map((header, idx) => (
                    <th key={idx} className={contentStyles.tableHeader}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {Object.keys(row).map((columnidx)=>(
                      <td key={columnidx} className={contentStyles.tableCell} onClick={()=>cellClick(rowIdx,columnidx)}>
                        {Celledit.row===rowIdx && Celledit.column===columnidx?(
                          <input className="tableInput" value={editedData[rowIdx][columnidx]}
                           onChange={(e)=>handleInput(rowIdx,columnidx,e.target.value)}
                          />):(editedData[rowIdx][columnidx])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         {isMobile && (
          <>
          <button className={contentStyles.contentButton} type="button" 
         style={{background:'#ececec', color:'#181028', fontWeight:600, marginTop:'5px'}} onClick={editMode}>Edit CSV</button>
          
          {confirmBtn && (
             <button
            className={contentStyles.contentConfirmButton}
            type="button"
          onClick={confirmation}>
            Confirm
          </button>
            
          )}
         </>
         )} 
            
          
        </section>

        <section className={contentStyles.previewSection}>
          <h2 className={contentStyles.sectionTitle}>Preview</h2>
          <div className={contentStyles.previewRow}>
            <div className={contentStyles.previewImageWrap}>
              <Image src="/content_preview.png" alt="Preview" width={369} height={242} className={contentStyles.previewImage} />
            </div>
            <div className={contentStyles.previewTextWrap}>
              <span className={contentStyles.previewLabel}>Preview</span>
              <div className={contentStyles.previewTitle}>Image Preview</div>
              <div className={contentStyles.previewDesc}>
                This is a preview of the image that will be generated based on the CSV content.
              </div>
            </div>
          </div>
        </section>

        
      </main>
            <div className={contentStyles.contentActions}>
         {!isMobile && 
         (<>
         <button className={contentStyles.contentButton} type="button" style={{background:'#ececec', color:'#181028', fontWeight:600}}
         onClick={editMode}   >Edit CSV</button>
          
          {confirmBtn && (
             <button
            className={contentStyles.contentConfirmButton}
            type="button"
          onClick={confirmation}>
            Confirm
            </button>)}
         </>)} 
           <button
            className={contentStyles.contentButton}
            type="button"
          >
            Next
          </button>
        </div>
    </div>
    
  );
}

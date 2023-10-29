
import ProductsPageIndex from "../../../components/ProducstPageIndex/ProductsPageIndex";
import styles from "./index.module.css"

export default function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}></div>
      <div className={styles.containerProducts}>
        <ProductsPageIndex/>
      </div>
    </div>
  )
}


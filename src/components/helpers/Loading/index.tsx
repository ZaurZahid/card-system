import styles from './loading.module.scss'

interface Props {
    children: React.ReactNode,
    isLoading?: boolean
}

const Loading = ({ isLoading = false, children }: Props) => {
    return (
        <>
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.loader}>
                        loading...
                    </div>
                </div>
            )
                : (children)
            }
        </>
    )
}

export default Loading
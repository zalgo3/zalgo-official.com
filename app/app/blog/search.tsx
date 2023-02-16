import styles from 'styles/app/search.module.css';

const Search = () => {
    return (
        <form
            id="cse-search-box"
            className={styles.form}
            action="https://google.com/cse"
            target="_blank"
        >
            <input type="hidden" name="cx" value="c5a64febdba45445c" />
            <input type="hidden" name="ie" value="UTF-8" />
            <input
                type="text"
                className={styles.input}
                name="q"
                placeholder="サイト内検索"
            />
            <button type="submit" className={styles.button} name="sa">
                検索
            </button>
        </form>
    );
};

export default Search;

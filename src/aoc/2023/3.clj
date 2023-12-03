;;;; Copyright (C) 2023  CToID <funk443@yandex.com>
;;;; 
;;;; This program is free software: you can redistribute it and/or modify it
;;;; under the terms of the GNU General Public License as published by the Free
;;;; Software Foundation, either version 3 of the License, or
;;;; (at your option) any later version.
;;;; 
;;;; This program is distributed in the hope that it will be useful, but WITHOUT
;;;; ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
;;;; FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
;;;; more details.
;;;; 
;;;; You should have received a copy of the GNU General Public License along
;;;; with this program.  If not, see <https://www.gnu.org/licenses/>.


(ns aoc.2023.3
  (:use [clojure.java.io :only [reader]]))


(defn index->x-y [row-width index]
  [(quot index row-width) (rem index row-width)])

(defn x-y->index [row-width x y]
  (+ (* row-width y) x))

(defn in-range? [row-width index-origin index-to-check]
  (let [index-top-left (- index-origin row-width 1)
        index-top-right (+ index-top-left 2)
        index-middle-left (- index-origin 1)
        index-middle-right (+ index-origin 1)
        index-bottom-left (+ index-origin row-width -1)
        index-bottom-right (+ index-bottom-left 2)]
    (or (<= index-top-left index-to-check index-top-right)
        (<= index-middle-left index-to-check index-middle-right)
        (<= index-bottom-left index-to-check index-bottom-right))))

(defn main []
  (with-open [rdr (reader "resource/2023/input3")]
    (let [raw-input
          (line-seq rdr)
          row-width
          (count (first raw-input))
          input
          (reduce str "" raw-input)
          numbers-and-symbols
          (-> 
           (->> (map-indexed #(vector %1 %2) input)
                (reduce (fn [{:keys [numbers
                                     symbols
                                     temp-digits
                                     temp-indexes]
                              :as m}
                             [i c]]
                          (cond
                            (and (zero? (rem i row-width))
                                 (some #(= c %) "0123456789")
                                 (empty? temp-digits))
                            (-> m
                                (update :temp-digits #(str % c))
                                (update :temp-indexes #(conj % i)))
                            (and (zero? (rem i row-width))
                                 (some #(= c %) "0123456789"))
                            {:numbers (conj numbers
                                            {:index temp-indexes
                                             :value (parse-long temp-digits)})
                             :symbols symbols
                             :temp-digits (str c)
                             :temp-indexes [i]}
                            (some #(= c %) "0123456789")
                            (-> m
                                (update :temp-digits #(str % c))
                                (update :temp-indexes #(conj % i)))
                            (and (every? #(not= c %) "0123456789.")
                                 (not (empty? temp-digits)))
                            {:numbers (conj numbers
                                            {:index temp-indexes
                                             :value (parse-long temp-digits)})
                             :symbols (conj symbols
                                            {:index i
                                             :type c})
                             :temp-digits ""
                             :temp-indexes []}
                            (every? #(not= c %) "0123456789.")
                            {:numbers numbers
                             :symbols (conj symbols
                                            {:index i
                                             :type c})
                             :temp-digits temp-digits
                             :temp-indexes temp-indexes}
                            (not (empty? temp-digits))
                            {:numbers (conj numbers
                                            {:index temp-indexes
                                             :value (parse-long temp-digits)})
                             :symbols symbols
                             :temp-digits ""
                             :temp-indexes []}
                            :else
                            m))
                        {:numbers []
                         :symbols []
                         :temp-digits ""
                         :temp-indexes []}))
           (select-keys [:numbers :symbols]))
          result1
          (reduce (fn [acc {:keys [index value]}]
                    (if (some (fn [i]
                                (some #(in-range? row-width i %)
                                      (->> (:symbols numbers-and-symbols)
                                           (map :index))))
                              index)
                      (+ acc value)
                      acc))
                  0
                  (:numbers numbers-and-symbols))
          result2
          (reduce (fn [acc symbol-index]
                    (let [numbers-in-range
                          (->> (filter (fn [{:keys [index value]}]
                                         (some #(in-range? row-width
                                                           symbol-index
                                                           %)
                                               index))
                                       (:numbers numbers-and-symbols))
                               (map :value))]
                      (if (= (count numbers-in-range) 2)
                        (+ acc (reduce * numbers-in-range))
                        acc)))
                  0
                  (->> (:symbols numbers-and-symbols)
                       (filter #(= \* (:type %)))
                       (map :index)))]
      result2)))
